import Navbar from "./NavbarB2B";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex bg-[linear-gradient(to_right,_#160040,_#9A0680)] text-white">

      {/* Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </main>
  );
}