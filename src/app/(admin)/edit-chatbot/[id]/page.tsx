'use client';

import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../../../graphql/apolloClient';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { typeFromAST } from 'graphql';
import { toast } from 'sonner';
import Avatar from '@/components/Avatar';

function EditChatbot({ params: { id } }: { params: { id: string } }) {
  const [url, setUrl] = useState<string>('');
  const [chatbotName, setChatbotName] = useState<string>('');

  useEffect(() => {
    const url = `${BASE_URL}/chatbot/${id}`;

    setUrl(url);
  }, [id]);

  return (
    <div className="px-0 md:p-10">
      <div className="md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2 md:border p-5 rounded-b-lg md:rounded-lg bg-[#2991EE]">
        <h2 className="text-white text-sm font-bold">Link to Chat</h2>
        <p className="text-sm text-white">
          Share this link with your audience to start conversations with you
          chatbot!
        </p>
        <div className="flex items-center space-x-2">
          <Link href={url} className="w-full cursor-pointer hover:opacity-50">
            <Input value={url} readOnly className="cursor-pointer" />
          </Link>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success('Copied to clipboard');
            }}
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <section className="relative mt-5 bg-white p-5 md:p-10 rounded-lg">
        <Button
          variant="destructive"
          className="absolute top-0 right-2 h-8 w-2"
          // onClick={() => handleDelete(id)}
        >
          X
        </Button>
        <div>
          <Avatar seed={chatbotName} />
        </div>
      </section>
    </div>
  );
}

export default EditChatbot;
