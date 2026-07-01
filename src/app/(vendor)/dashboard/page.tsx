"use client";

import {
  IconCalendarEvent,
  IconClipboardList,
  IconCreditCard,
  IconDots,
  IconPackageExport,
  IconReportAnalytics,
} from "@tabler/icons-react";
import { animate, inView } from "motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import {
  creditInfo,
  currentUser,
  pendingVendorOrderCount,
  vendors,
} from "@/data/mock-data";
import { formatCLP, formatDate } from "@/lib/format";

const RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function DashboardPage() {
  const vendor = vendors.find((v) => v.id === "v-42");
  const [creditAmount, setCreditAmount] = useState(0);
  const [debtPercent, setDebtPercent] = useState(0);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const cleanup = inView(
      "main",
      () => {
        animate(0, creditInfo.available, {
          duration: 2,
          ease: "circOut",
          onUpdate: (v) => setCreditAmount(Math.round(v)),
        });
        animate(0, creditInfo.debtPaidPercent, {
          duration: 2,
          ease: "circOut",
          onUpdate: (v) => setDebtPercent(Math.round(v)),
        });
        if (ringRef.current) {
          animate(
            ringRef.current,
            {
              strokeDashoffset: [
                CIRCUMFERENCE,
                CIRCUMFERENCE * (1 - creditInfo.debtPaidPercent / 100),
              ],
            },
            { duration: 2, ease: "circOut" },
          );
        }
        return () => {};
      },
      { amount: 0.1 },
    );

    return cleanup;
  }, []);

  return (
    <div>
      <header className="flex items-center justify-between px-6 pb-6 pt-10">
        <Reveal>
          <h1 className="font-outfit text-2xl font-bold text-oxford-navy">
            Hola, {currentUser.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-sm text-slate-500">
            Puesto #{vendor?.stallNumber}, {vendor?.feriaName}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-12 w-12 overflow-hidden rounded-2xl border-2 border-white shadow-sm">
            <Image
              src={currentUser.avatar}
              alt="Avatar"
              width={48}
              height={48}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
        </Reveal>
      </header>

      <main className="space-y-6 px-6">
        <div className="grid grid-cols-2 gap-4">
          <Reveal delay={0.1}>
            <div className="bento-card flex h-44 flex-col justify-between p-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Mi Crédito
                </span>
                <h2 className="mt-1 font-outfit text-2xl font-bold text-oxford-navy">
                  {formatCLP(creditAmount)}
                </h2>
              </div>
              <div>
                <p className="mb-3 text-[11px] font-bold text-light-sea-green">
                  Disponible hoy
                </p>
                <Link
                  href="/credit"
                  className="soft-pill-shadow w-fit rounded-full bg-light-sea-green px-5 py-2 text-[11px] font-bold text-white transition-all hover:scale-105 active:scale-95"
                >
                  Solicitar
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex h-44 flex-col justify-between rounded-[2rem] bg-light-sea-green p-5 text-white shadow-lg shadow-teal-500/10">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <IconCreditCard size={22} />
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-2 py-1">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-300" />
                  <span className="text-[8px] font-bold uppercase tracking-tighter">
                    Live
                  </span>
                </div>
              </div>
              <div>
                <span className="block text-[10px] font-semibold opacity-80">
                  Tarjeta FeriApp
                </span>
                <span className="font-outfit text-lg font-bold uppercase tracking-tight">
                  {creditInfo.cardActive ? "ACTIVA" : "INACTIVA"}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="bento-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-outfit text-sm font-bold text-oxford-navy">
                Pago de Deuda
              </h3>
              <IconDots className="text-slate-300" />
            </div>

            <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full -rotate-90"
                viewBox="0 0 200 200"
              >
                <circle
                  cx="100"
                  cy="100"
                  r={RADIUS}
                  stroke="#F1F5F9"
                  strokeWidth="14"
                  fill="none"
                />
              </svg>
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full -rotate-90"
                viewBox="0 0 200 200"
              >
                <circle
                  ref={ringRef}
                  cx="100"
                  cy="100"
                  r={RADIUS}
                  stroke="var(--color-light-sea-green)"
                  strokeWidth="14"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE}
                />
              </svg>
              <div className="relative z-10 text-center">
                <span className="block font-outfit text-5xl font-bold leading-none text-oxford-navy">
                  {debtPercent}%
                </span>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  Pagado
                </span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-oxford-navy shadow-xs">
                <IconCalendarEvent size={20} />
              </div>
              <div className="flex-1">
                <p className="mb-1 text-[10px] font-bold uppercase leading-none text-slate-400">
                  Próximo Vencimiento
                </p>
                <p className="text-sm font-bold text-oxford-navy">
                  {formatDate(creditInfo.nextPaymentDate)}
                </p>
              </div>
              <Link
                href="/credit"
                className="rounded-xl bg-oxford-navy px-4 py-2.5 text-[11px] font-bold text-white transition-transform active:scale-95"
              >
                Pagar
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="space-y-3 pb-6">
            <h3 className="ml-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Gestión del Puesto
            </h3>
            <div className="overflow-hidden rounded-[2rem] border border-teal-100/30 bg-white shadow-xs">
              <ManageLink
                href="/store"
                icon={IconPackageExport}
                label="Editar Productos"
              />
              <ManageLink
                href="/vendor-orders"
                icon={IconClipboardList}
                label="Ver Pedidos"
                badge={pendingVendorOrderCount}
              />
              <ManageLink
                href="/reports"
                icon={IconReportAnalytics}
                label="Reporte de Ventas"
                last
              />
            </div>
          </div>
        </Reveal>
      </main>
    </div>
  );
}

function ManageLink({
  href,
  icon: Icon,
  label,
  badge,
  last,
}: {
  href: string;
  icon: typeof IconCreditCard;
  label: string;
  badge?: number;
  last?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group flex w-full items-center justify-between p-5 transition-all hover:bg-slate-50 ${
        last ? "" : "border-b border-slate-50"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-light-sea-green/10 text-light-sea-green shadow-xs transition-transform group-hover:scale-110">
          <Icon size={22} />
        </div>
        <span className="text-base font-bold text-oxford-navy">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge ? (
          <span className="rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm shadow-red-200">
            {badge}
          </span>
        ) : null}
        <IconChevron />
      </div>
    </Link>
  );
}

function IconChevron() {
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
