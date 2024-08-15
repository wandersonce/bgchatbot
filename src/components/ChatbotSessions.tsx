'use client';

import { useEffect, useState } from 'react';
import { Chatbot } from '../../types/types';

function ChatbotSessions({ chatbots }: { chatbots: Chatbot[] }) {
  const [sortedChatbots, setSortedChatbots] = useState<Chatbot[]>([]);

  //This sort chatbots by quantity of sessions
  useEffect(() => {
    const sortedArray = [...chatbots].sort(
      (a, b) => b.chat_sessions.length - b.chat_sessions.length
    );

    setSortedChatbots(sortedArray);
  }, [chatbots]);

  return <div>ChatbotSessions</div>;
}

export default ChatbotSessions;
