import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import ApolloProviderWrapper from '@/components/ApolloProvider';

export const metadata: Metadata = {
  title: 'Bam Tech & Setup',
  description: 'Ask Anything about my Space',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProviderWrapper>
      <ClerkProvider>
        <html lang="en">
          <body className="min-h-screen flex">
            {children}
            {/* Toaster */}
          </body>
        </html>
      </ClerkProvider>
    </ApolloProviderWrapper>
  );
}
