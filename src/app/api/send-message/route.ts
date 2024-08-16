import { serverClient } from '@/lib/server/serverClient';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import {
  GetChatbotByIdResponse,
  MessagesByChatSessionIdResponse,
} from '../../../../types/types';
import {
  GET_CHATBOT_BY_ID,
  GET_MESSAGES_BY_CHAT_SESSION_ID,
} from '../../../../graphql/queries/queries';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { chat_session_id, chatbot_id, content, name } = await req.json();

  console.log(
    `Received message from chat session ${chat_session_id}: ${content} (chatbot: ${chatbot_id})`
  );

  try {
    //Fetch chatbot characteristics
    const { data } = await serverClient.query<GetChatbotByIdResponse>({
      query: GET_CHATBOT_BY_ID,
      variables: { id: chatbot_id },
    });

    const chatbot = data.chatbots;

    if (!chatbot) {
      return NextResponse.json({ error: 'Chatbot not found' }, { status: 404 });
    }

    //Fetch previous messages
    const { data: messagesData } =
      await serverClient.query<MessagesByChatSessionIdResponse>({
        query: GET_MESSAGES_BY_CHAT_SESSION_ID,
        variables: { chat_session_id },
        fetchPolicy: 'no-cache',
      });

    const previousMessages = messagesData.chat_sessions.messages;

    //Formatting previous messages as expected data to OpenAI
    const formattedPreviousMessages: ChatCompletionMessageParam[] =
      previousMessages.map((message) => ({
        role: message.sender === 'ai' ? 'system' : 'user',
        name: message.sender === 'ai' ? ' system' : name,
        content: message.content,
      }));

    //Combine characteristics into a system prompt
    const systemPrompt = chatbot.chatbot_characteristics
      .map((c) => c.content)
      .join(' + ');
    console.log(systemPrompt);

    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        name: 'system',
        content: `You are a helpful assistant that uses a super casual language talking to ${name}. If a generic question is asked which is not relevant or in the same scope or domain as the points in mentioned in the key information section, kindly inform the user theyre only allowed to search for the specified content. Use Emoji's where possible. Here is some key information that you need to be aware  of, these are elements you may be asked about: ${systemPrompt}`,
      },
      ...formattedPreviousMessages,
      {
        role: 'user',
        name: name,
        content: content,
      },
    ];

    //Send the message to OpenAI's Completions API
    const opneaiResponse = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-4o',
    });
  } catch (error) {
    console.log('Error sending message', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
