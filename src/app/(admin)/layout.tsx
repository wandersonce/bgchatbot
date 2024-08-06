import Header from '@/components/Header';

function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* Header */}
      <Header />
      <div>
        {/* Sidebar Panel */}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
