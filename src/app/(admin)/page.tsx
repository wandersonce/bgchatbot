import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-10 bg-white m-10 rounded-md w-full">
      <h1 className="text-4xl font-light">
        Welcome to{' '}
        <span className="text-[#64B5F5] font-semibold">Bam Chatbot</span>
      </h1>
      <h2 className="mt-2 mb-10">
        Your AI agent that will help you manage your audience questions.
      </h2>

      <Link href="/create-chatbot">
        <Button className="bg-[#64B5F5]">
          Lets get started by creating your first chatbot
        </Button>
      </Link>
    </main>
  );
}
