import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { AlertOctagon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/login');
  }

  const user = await clerkClient.users.getUser(userId!);
  const isAdmin = user.privateMetadata.admin;

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <Header />
      <div className="flex flex-col flex-1 lg:flex-row bg-gray-100">
        {isAdmin ? (
          <>
            {/* Sidebar Panel */}
            <Sidebar />
            <div className="flex-1 flex justify-center lg:justify-start items-start max-w-5xl mx-auto w-full">
              {children}
            </div>
          </>
        ) : (
          <div className="flex-1 p-10 flex gap-2 flex-col items-center justify-center max-w-5xl mx-auto w-full bg-white">
            <AlertOctagon className=" w-20 h-20 pb-3 text-red-500" />
            <h1 className="text-3xl font-bold">Only Admin Allowed</h1>
            <p className="text-sm font-light text-gray-600">
              If Bam did not give access to you, that means he does not know
              you! 😅{' '}
            </p>

            <Link href="https://bamgamesofc.vercel.app/" className="mt-6">
              <Button className="font-bold">Check Bam&apos;s Bio Link</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminLayout;
