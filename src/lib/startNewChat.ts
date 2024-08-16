import client from '../../graphql/apolloClient';
import {
  INSERT_CHAT_SESSION,
  INSERT_GUEST,
  INSERT_MESSAGE,
} from '../../graphql/mutations/mutations';

async function startNewChat(
  guestName: string,
  guestEmail: string,
  chatbotId: number
) {
  try {
    // Create a new guest entry
    const guestResult = await client.mutate({
      mutation: INSERT_GUEST,
      variables: { name: guestName, email: guestEmail, created_at: new Date() },
    });

    const guestId = guestResult.data.insertGuests.id;

    // Initialize a new chat session
    const chatSessionResult = await client.mutate({
      mutation: INSERT_CHAT_SESSION,
      variables: {
        chatbot_id: chatbotId,
        guest_id: guestId,
        created_at: new Date(),
      },
    });

    const chatSessionId = chatSessionResult.data.insertChat_sessions.id;

    //Insert Initial message - This will be the bot first welcome message
    await client.mutate({
      mutation: INSERT_MESSAGE,
      variables: {
        chat_session_id: chatSessionId,
        sender: 'ai',
        content: `Welcome ${guestName}!\n How can I assist you today? 🫡`,
        created_at: new Date(),
      },
    });

    console.log('New chat session started successfully!');

    return chatSessionId;
  } catch (error) {
    console.log('Error starting new chat session: ', error);
  }
}

export default startNewChat;
