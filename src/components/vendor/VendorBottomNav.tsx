"use client";

import {
  IconClipboardList,
  IconCreditCard,
  IconShoppingBag,
  IconSmartHome,
  IconUserCircle,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Inicio", icon: IconSmartHome },
  { href: "/vendor-orders", label: "Pedidos", icon: IconClipboardList },
  { href: "/credit", label: "Crédito", icon: IconCreditCard },
  { href: "/vendor-profile", label: "Perfil", icon: IconUserCircle },
];

export default function VendorBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-[375px] -translate-x-1/2 items-end justify-between rounded-t-[32px] border-t border-slate-100 bg-white/95 px-4 pt-3 pb-6 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
      <NavItem item={items[0]} active={isActive(pathname, items[0].href)} />
      <NavItem item={items[1]} active={isActive(pathname, items[1].href)} />

      <div className="relative flex h-14 w-16 items-center justify-center">
        <Link
          href="/marketplace"
          className="group absolute -top-7 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-light-sea-green text-white shadow-[0_12px_28px_rgba(32,178,170,0.3)] transition-transform active:scale-90"
        >
          <IconShoppingBag
            size={26}
            className="transition-transform group-hover:scale-110"
          />
        </Link>
        <span className="absolute bottom-0 text-[9px] font-bold uppercase tracking-widest text-oxford-navy">
          Mercado
        </span>
      </div>

      <NavItem item={items[2]} active={isActive(pathname, items[2].href)} />
      <NavItem item={items[3]} active={isActive(pathname, items[3].href)} />
    </nav>
  );
}

function NavItem({
  item,
  active,
}: {
  item: { href: string; label: string; icon: typeof IconSmartHome };
  active: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`flex flex-1 flex-col items-center justify-center gap-1 transition-colors ${
        active ? "text-light-sea-green" : "text-slate-400"
      }`}
    >
      <Icon className="text-xl" />
      <span className="text-[9px] font-bold uppercase tracking-tighter">
        {item.label}
      </span>
    </Link>
  );
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}
