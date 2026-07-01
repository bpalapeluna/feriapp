"use client";

import {
  IconBuildingStore,
  IconShoppingCart,
  IconSmartHome,
  IconTicket,
  IconUserCircle,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "@/components/RoleProvider";

const items = [
  { href: "/marketplace", label: "Inicio", icon: IconSmartHome },
  { href: "/orders", label: "Pedidos", icon: IconShoppingCart },
  { href: "/coupons", label: "Cupones", icon: IconTicket },
  { href: "/profile", label: "Perfil", icon: IconUserCircle },
];

export default function CustomerBottomNav() {
  const pathname = usePathname();
  const { role } = useRole();
  const showStallFab = role === "feriante";

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 flex h-20 w-full max-w-[375px] -translate-x-1/2 items-center justify-between rounded-t-[32px] border-t border-hairline/30 bg-white px-6 shadow-[0_-8px_32px_rgba(0,0,0,0.04)]">
      {items.slice(0, 2).map((item) => (
        <NavButton
          key={item.href}
          item={item}
          active={isActive(pathname, item.href)}
        />
      ))}

      {showStallFab ? <div className="w-16" /> : null}

      {items.slice(2).map((item) => (
        <NavButton
          key={item.href}
          item={item}
          active={isActive(pathname, item.href)}
        />
      ))}

      {showStallFab && (
        <Link
          href="/dashboard"
          className="absolute -top-10 left-1/2 flex -translate-x-1/2 flex-col items-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl border-4 border-white bg-light-sea-green text-white shadow-[0_12px_28px_rgba(32,178,170,0.3)] transition-all hover:shadow-[0_16px_32px_rgba(32,178,170,0.5)] active:scale-90">
            <IconBuildingStore size={30} />
          </div>
          <span className="mt-1.5 text-center text-[9px] font-outfit font-bold uppercase tracking-widest text-oxford-navy">
            Mi Puesto
          </span>
        </Link>
      )}
    </nav>
  );
}

function NavButton({
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
      className={`group flex w-14 cursor-pointer flex-col items-center gap-1 transition-colors ${
        active ? "text-light-sea-green" : "text-oxford-navy/30"
      }`}
    >
      <div className="relative">
        <Icon className="text-2xl transition-transform group-active:scale-90" />
        {active && (
          <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-light-sea-green" />
        )}
      </div>
      <span className="text-[9px] font-outfit font-bold uppercase tracking-widest">
        {item.label}
      </span>
    </Link>
  );
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/marketplace") return pathname === "/marketplace";
  return pathname.startsWith(href);
}
