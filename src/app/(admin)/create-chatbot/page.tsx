'use client';

import Avatar from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMutation } from '@apollo/client';
import { CREATE_CHATBOT } from '../../../../graphql/mutations/mutations';
import { useUser } from '@clerk/nextjs';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

function CreateChatbot() {
  const { user } = useUser();
  const [name, setName] = useState('');
  const router = useRouter();

  const [createChatbot, { data, loading, error }] = useMutation(
    CREATE_CHATBOT,
    {
      variables: {
        clerk_user_id: user?.id,
        name,
        created_at: new Date(),
      },
    }
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await createChatbot();
      setName('');

      router.push(`/edit-chatbot/${data.data.insertChatbots.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center md:flex-col md:space-x-10 bg-white p-10 rounded-md m-10">
      <Avatar seed="Create Chatbot" />
      <div>
        <h1 className="text-xl lg:text-3xl font-semibold">Create</h1>
        <h2 className="font-light">
          Create a new chatbot to assist you in your conversations with your
          customers.
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-2 mt-5"
        >
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Chatbot Name..."
            className="max-w-lg"
            required
          />
          <Button type="submit" disabled={loading || !name}>
            {loading ? 'Creating Chatbot...' : 'Create Chatbot'}
          </Button>
        </form>

        <p className="text-gray-300 mt-5">Example: Customer Support</p>
      </div>
    </div>
  );
}

export default CreateChatbot;
