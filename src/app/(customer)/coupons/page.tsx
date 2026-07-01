"use client";

import {
  IconCheck,
  IconClock,
  IconCopy,
  IconTicket,
} from "@tabler/icons-react";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { type Coupon, coupons, getCategoryById } from "@/data/mock-data";
import { formatDate } from "@/lib/format";

export default function CouponsPage() {
  const active = coupons.filter((c) => !c.used);
  const used = coupons.filter((c) => c.used);

  return (
    <div>
      <PageHeader title="Cupones" subtitle={`${active.length} disponibles`} />

      <main className="space-y-6 px-6">
        <section className="space-y-3">
          <h2 className="ml-1 text-[10px] font-bold uppercase tracking-[0.2em] text-oxford-navy/40">
            Disponibles
          </h2>
          {active.length === 0 ? (
            <p className="py-8 text-center text-sm text-oxford-navy/50">
              No tienes cupones disponibles
            </p>
          ) : (
            active.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.08}>
                <CouponCard coupon={c} />
              </Reveal>
            ))
          )}
        </section>

        {used.length > 0 && (
          <section className="space-y-3">
            <h2 className="ml-1 text-[10px] font-bold uppercase tracking-[0.2em] text-oxford-navy/40">
              Usados
            </h2>
            {used.map((c) => (
              <CouponCard key={c.id} coupon={c} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

function CouponCard({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false);
  const category = getCategoryById(coupon.categoryId);
  const isUsed = coupon.used;
  const isExpired = new Date(coupon.expiry) < new Date("2026-06-30");
  const dimmed = isUsed || isExpired;

  const copy = () => {
    navigator.clipboard?.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border shadow-sm transition-all ${
        dimmed
          ? "border-hairline/30 bg-ghost-white/60 opacity-60"
          : "border-light-sea-green/15 bg-white"
      }`}
    >
      <div className="flex items-stretch">
        <div
          className={`flex w-20 shrink-0 flex-col items-center justify-center gap-1 border-r-2 border-dashed border-hairline/30 ${
            dimmed ? "bg-ghost-white" : "bg-light-sea-green/8"
          }`}
        >
          <IconTicket
            size={26}
            className={dimmed ? "text-oxford-navy/30" : "text-light-sea-green"}
          />
          <span
            className={`font-outfit text-lg font-bold ${
              dimmed ? "text-oxford-navy/40" : "text-light-sea-green"
            }`}
          >
            {coupon.discountType === "percent"
              ? `${coupon.discountValue}%`
              : `$${coupon.discountValue}`}
          </span>
        </div>

        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-outfit text-base font-bold text-oxford-navy">
              {coupon.title}
            </h3>
            {isUsed && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold uppercase text-slate-500">
                Usado
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-oxford-navy/50">
            {coupon.description}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-lg bg-ghost-white px-2 py-1 font-outfit text-xs font-bold tracking-wider text-oxford-navy">
              {coupon.code}
            </span>
            <button
              type="button"
              onClick={copy}
              disabled={dimmed}
              className="flex items-center gap-1 text-[11px] font-bold text-light-sea-green disabled:text-oxford-navy/30"
            >
              {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-oxford-navy/40">
            <IconClock size={12} />
            Vence {formatDate(coupon.expiry)}
            {category && <> · {category.name}</>}
          </div>
        </div>
      </div>
    </div>
  );
}
