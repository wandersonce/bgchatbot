import type { Metadata } from 'next';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
