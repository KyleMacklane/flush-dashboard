import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className="w-64 h-screen bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li className="mb-4"><Link href="/clients">Clients</Link></li>
          <li className="mb-4"><Link href="/bookings">Bookings</Link></li>
          <li className="mb-4"><Link href="/messages">Messages</Link></li>
          <li className="mb-4"><Link href="/services">Services</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
