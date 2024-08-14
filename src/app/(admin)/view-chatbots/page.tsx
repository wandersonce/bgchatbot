import { serverClient } from '@/lib/server/serverClient';
import { auth } from '@clerk/nextjs/server';
import { GET_CHATBOT_BY_USER } from '../../../../graphql/queries/queries';
import {
  Chatbot,
  GetChatbotsByUserData,
  GetChatbotsByUserDataVariables,
} from '../../../../types/types';

export const dynamic = 'force-dynamic';

async function ViewChatbots() {
  const { userId } = await auth();
  if (!userId) return;

  // Get the chatbots for the user
  const {
    data: { chatbotsByUser },
  } = await serverClient.query<
    GetChatbotsByUserData,
    GetChatbotsByUserDataVariables
  >({
    query: GET_CHATBOT_BY_USER,
    variables: {
      clerk_user_id: userId,
    },
  });

  //Sort by the most recent chats
  const sortedChatbotsByUser: Chatbot[] = [...chatbotsByUser].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div>
      <h1 className="text-xl lg:text-3xl font-semibold mb-5">
        Active Chatbots
      </h1>
    </div>
  );
}

export default ViewChatbots;
