"use client";

import {
  IconBell,
  IconCreditCard,
  IconLogout,
  IconMapPin,
  IconSettings,
  IconShield,
  IconShoppingCart,
  IconTicket,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { currentUser, customerOrders } from "@/data/mock-data";

export default function CustomerProfilePage() {
  const router = useRouter();
  const totalSpent = customerOrders.reduce((s, o) => s + o.total, 0);

  const handleLogout = () => router.push("/auth");

  return (
    <div>
      <PageHeader title="Mi Perfil" />

      <main className="space-y-6 px-6">
        <Reveal>
          <div className="bento-card flex items-center gap-4 p-5">
            <div className="h-16 w-16 overflow-hidden rounded-2xl border-2 border-white shadow-sm">
              <Image
                src="https://i.pravatar.cc/200?u=me"
                alt="Avatar"
                width={64}
                height={64}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-outfit text-lg font-bold text-oxford-navy">
                {currentUser.name}
              </h2>
              <p className="truncate text-xs text-oxford-navy/50">
                {currentUser.email}
              </p>
              <span className="mt-1 inline-block rounded-full bg-light-sea-green/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-light-sea-green">
                Cliente
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Pedidos" value={String(customerOrders.length)} />
            <StatCard
              label="Gastado"
              value={`$${totalSpent.toLocaleString("es-CL")}`}
            />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="space-y-3">
            <h3 className="ml-1 text-[10px] font-bold uppercase tracking-[0.2em] text-oxford-navy/40">
              Cuenta
            </h3>
            <div className="overflow-hidden rounded-3xl border border-hairline/40 bg-white shadow-xs">
              <InfoRow
                icon={IconMapPin}
                label="Dirección"
                value="Feria Iquique, Puesto #42"
              />
              <InfoRow
                icon={IconCreditCard}
                label="RUT"
                value={currentUser.rut}
              />
              <InfoRow
                icon={IconBell}
                label="Teléfono"
                value={currentUser.phone}
                last
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="space-y-3">
            <h3 className="ml-1 text-[10px] font-bold uppercase tracking-[0.2em] text-oxford-navy/40">
              Preferencias
            </h3>
            <div className="overflow-hidden rounded-3xl border border-hairline/40 bg-white shadow-xs">
              <MenuLink
                href="/orders"
                icon={IconShoppingCart}
                label="Mis Pedidos"
              />
              <MenuLink href="/coupons" icon={IconTicket} label="Mis Cupones" />
              <MenuLink href="#" icon={IconSettings} label="Configuración" />
              <MenuLink href="#" icon={IconShield} label="Privacidad" last />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-white py-4 font-bold text-red-500 transition-all active:scale-95"
          >
            <IconLogout size={20} />
            Cerrar Sesión
          </button>
        </Reveal>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bento-card flex flex-col items-center justify-center gap-1 p-5">
      <span className="font-outfit text-2xl font-bold text-oxford-navy">
        {value}
      </span>
      <span className="text-[11px] font-bold uppercase tracking-wider text-oxford-navy/40">
        {label}
      </span>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  last,
}: {
  icon: typeof IconSettings;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 p-4 ${last ? "" : "border-b border-hairline/20"}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-light-sea-green/10 text-light-sea-green">
        <Icon size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-oxford-navy/40">
          {label}
        </p>
        <p className="truncate text-sm font-bold text-oxford-navy">{value}</p>
      </div>
    </div>
  );
}

function MenuLink({
  href,
  icon: Icon,
  label,
  last,
}: {
  href: string;
  icon: typeof IconSettings;
  label: string;
  last?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center justify-between p-4 transition-all hover:bg-slate-50 ${
        last ? "" : "border-b border-hairline/20"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={22} className="text-oxford-navy/60" />
        <span className="text-sm font-bold text-oxford-navy">{label}</span>
      </div>
      <IconChevronRight />
    </Link>
  );
}

function IconChevronRight() {
  return (
    <svg
      role="img"
      aria-label="Ver más"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-light-sea-green"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
