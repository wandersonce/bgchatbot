'use client';

import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../../../graphql/apolloClient';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

import { toast } from 'sonner';
import Avatar from '@/components/Avatar';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CHATBOT_BY_ID } from '../../../../../graphql/queries/queries';
import {
  GetChatbotByIdResponse,
  GetChatbotByIdVariables,
} from '../../../../../types/types';
import Characteristic from '@/components/Characteristic';
import { DELETE_CHATBOT } from '../../../../../graphql/mutations/mutations';

function EditChatbot({ params: { id } }: { params: { id: string } }) {
  const [url, setUrl] = useState<string>('');
  const [newCharacteristic, setNewCharacteristic] = useState<string>('');
  const [chatbotName, setChatbotName] = useState<string>('');

  const [deleteChatbot] = useMutation(DELETE_CHATBOT, {
    refetchQueries: [{ query: GET_CHATBOT_BY_ID }],
    awaitRefetchQueries: true,
  });

  const { data, loading, error } = useQuery<
    GetChatbotByIdResponse,
    GetChatbotByIdVariables
  >(GET_CHATBOT_BY_ID, { variables: { id } });

  useEffect(() => {
    if (data) {
      setChatbotName(data.chatbots.name);
    }
  }, [data]);

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
        <div className="flex space-x-4">
          <Avatar seed={chatbotName} />
          <form
            // onSubmit={handleUpdateChatbot}
            className="flex flex-1 space-x-2 items-center"
          >
            <Input
              value={chatbotName}
              onChange={(e) => setChatbotName(e.target.value)}
              placeholder={chatbotName}
              className="w-full border-none bg-transparent text-xl font-bold"
              required
            />
            <Button disabled={!chatbotName} type="submit">
              Update
            </Button>
          </form>
        </div>
        <h2 className="text-xl font-bold mt-10">Heres what your AI knows...</h2>
        <p>
          Your chatbot is equipped with the following information to assist you
          in your conversations with your audience
        </p>
        <div>
          <form className="flex">
            <Input
              type="text"
              placeholder="Example: If user asks for product, provide url of the item."
              value={newCharacteristic}
              onChange={(e) => setNewCharacteristic(e.target.value)}
            />
            <Button type="submit" disabled={!newCharacteristic}>
              Add
            </Button>
          </form>
          <ul className="flex flex-wrap-reverse gap-5">
            {data?.chatbots.chatbot_characteristics.map((characteristic) => (
              <Characteristic
                key={characteristic.id}
                characteristic={characteristic}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default EditChatbot;
