'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Message } from '../../../../../types/types';

function ChatbotPage({ params: { id } }: { params: { id: string } }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [chatId, setChatId] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  return <div>page</div>;
}

export default ChatbotPage;
