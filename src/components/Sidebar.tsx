"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Properties", href: "/properties" },
  { label: "Production", href: "/production" },
  { label: "Revenue", href: "/revenue" },
  { label: "Expenses", href: "/expenses" },
  { label: "Accounting", href: "/accounting/batches" },
  { label: "Hedge Management", href: "/hedge-management" },
  { label: "Reports", href: "/reports" },
  { label: "Documents", href: "/documents" },
  { label: "Administration", href: "/administration" },
];

function NavItem({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2 rounded-r-md space-x-3 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
        active ? "bg-gray-100 font-medium border-r-2 border-indigo-500" : "text-gray-700"
      }`}
    >
      <span className="w-3 h-3 rounded bg-gray-300" aria-hidden />
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname() || "/";

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-5 border-b border-gray-100">
        <Link href="/dashboard" className="text-lg font-semibold text-gray-900">
          PetroLedger
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.href} href={item.href} label={item.label} active={pathname === item.href} />
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-gray-100 text-xs text-gray-500">
        <div>Version 0.0.1</div>
      </div>
    </div>
  );
}
