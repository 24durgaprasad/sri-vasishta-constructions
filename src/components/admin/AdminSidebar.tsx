"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const nav = [
  { label: "Dashboard", href: "/admin", icon: "⊞" },
  { label: "Projects", href: "/admin/projects", icon: "🏗" },
  { label: "Units", href: "/admin/units", icon: "🏠" },
  { label: "Plots", href: "/admin/plots", icon: "📐" },
  { label: "Layouts", href: "/admin/layouts", icon: "🗺" },
  { label: "Enquiries", href: "/admin/enquiries", icon: "✉" },
  { label: "Partners", href: "/admin/partners", icon: "🤝" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="w-64 min-h-screen bg-navy-950 text-white flex flex-col border-r border-navy-800 shrink-0">
      <div className="p-6 border-b border-navy-800">
        <Link href="/admin" className="flex items-center gap-2">
          <Image src="/brand/logo-reversed.png" alt="Vasishta" width={120} height={32} className="h-8 w-auto" />
        </Link>
        <p className="text-navy-400 text-xs mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {nav.map((item) => {
          const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-brand-500 text-white font-medium"
                  : "text-navy-300 hover:bg-navy-800 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-navy-800">
        <Link href="/" className="block text-xs text-navy-400 hover:text-white mb-2 transition-colors">
          ← View Site
        </Link>
        <button
          onClick={handleLogout}
          type="button"
          className="w-full text-left px-3 py-2 rounded-lg text-sm text-navy-300 hover:bg-navy-800 hover:text-white transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
