"use client";

import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconCreditCard,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import {
  type CreditInfo,
  type CreditTransaction,
  creditInfo as initialCredit,
} from "@/data/mock-data";
import { formatCLP, formatDate } from "@/lib/format";

const RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CreditPage() {
  const [credit, setCredit] = useState<CreditInfo>(initialCredit);
  const [showRequest, setShowRequest] = useState(false);

  const payDebt = () => {
    setCredit((prev) => {
      const newPaid = Math.min(100, prev.debtPaidPercent + 10);
      const tx: CreditTransaction = {
        id: `t-${Date.now()}`,
        type: "pago",
        description: "Pago de cuota",
        amount: prev.nextPaymentAmount,
        date: new Date().toISOString().slice(0, 10),
      };
      return {
        ...prev,
        debtPaidPercent: newPaid,
        history: [tx, ...prev.history],
      };
    });
  };

  const requestCredit = (amount: number) => {
    setCredit((prev) => {
      const tx: CreditTransaction = {
        id: `t-${Date.now()}`,
        type: "credito",
        description: "Solicitud de crédito",
        amount,
        date: new Date().toISOString().slice(0, 10),
      };
      return {
        ...prev,
        available: prev.available + amount,
        history: [tx, ...prev.history],
      };
    });
    setShowRequest(false);
  };

  const offset = CIRCUMFERENCE * (1 - credit.debtPaidPercent / 100);

  return (
    <div>
      <PageHeader
        title="Crédito"
        subtitle="Gestión financiera"
        backHref="/dashboard"
      />

      <main className="space-y-6 px-6">
        <Reveal>
          <div className="grid grid-cols-2 gap-4">
            <div className="bento-card flex h-40 flex-col justify-between p-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Disponible
              </span>
              <div>
                <h2 className="font-outfit text-2xl font-bold text-oxford-navy">
                  {formatCLP(credit.available)}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowRequest(true)}
                  className="mt-3 w-fit rounded-full bg-light-sea-green px-5 py-2 text-[11px] font-bold text-white soft-pill-shadow transition-all active:scale-95"
                >
                  Solicitar
                </button>
              </div>
            </div>

            <div className="flex h-40 flex-col justify-between rounded-[2rem] bg-light-sea-green p-5 text-white shadow-lg shadow-teal-500/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <IconCreditCard size={22} />
              </div>
              <div>
                <span className="block text-[10px] font-semibold opacity-80">
                  Tarjeta FeriApp
                </span>
                <span className="font-outfit text-lg font-bold uppercase tracking-tight">
                  {credit.cardActive ? "ACTIVA" : "INACTIVA"}
                </span>
                <span className="mt-1 block text-[11px] tracking-widest opacity-70">
                  {credit.cardNumber}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bento-card p-6">
            <h3 className="mb-6 font-outfit text-sm font-bold text-oxford-navy">
              Pago de Deuda
            </h3>
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
                  cx="100"
                  cy="100"
                  r={RADIUS}
                  stroke="var(--color-light-sea-green)"
                  strokeWidth="14"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={offset}
                  style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
              </svg>
              <div className="relative z-10 text-center">
                <span className="block font-outfit text-5xl font-bold leading-none text-oxford-navy">
                  {credit.debtPaidPercent}%
                </span>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  Pagado
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Próximo pago
                </p>
                <p className="text-sm font-bold text-oxford-navy">
                  {formatCLP(credit.nextPaymentAmount)}
                </p>
                <p className="text-[11px] text-oxford-navy/50">
                  {formatDate(credit.nextPaymentDate)}
                </p>
              </div>
              <button
                type="button"
                onClick={payDebt}
                disabled={credit.debtPaidPercent >= 100}
                className="rounded-xl bg-oxford-navy px-5 py-2.5 text-[11px] font-bold text-white transition-transform active:scale-95 disabled:opacity-40"
              >
                Pagar
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="space-y-3 pb-6">
            <h3 className="ml-1 text-[10px] font-bold uppercase tracking-[0.2em] text-oxford-navy/40">
              Historial
            </h3>
            <div className="overflow-hidden rounded-3xl border border-hairline/40 bg-white shadow-xs">
              {credit.history.map((tx, i) => (
                <div
                  key={tx.id}
                  className={`flex items-center gap-3 p-4 ${
                    i === credit.history.length - 1
                      ? ""
                      : "border-b border-hairline/20"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      tx.type === "pago"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-sky-50 text-sky-600"
                    }`}
                  >
                    {tx.type === "pago" ? (
                      <IconArrowUpRight size={20} />
                    ) : (
                      <IconArrowDownLeft size={20} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-oxford-navy">
                      {tx.description}
                    </p>
                    <p className="text-[11px] text-oxford-navy/40">
                      {formatDate(tx.date)}
                    </p>
                  </div>
                  <span
                    className={`font-outfit text-sm font-bold ${
                      tx.type === "pago" ? "text-emerald-600" : "text-sky-600"
                    }`}
                  >
                    {tx.type === "pago" ? "-" : "+"}
                    {formatCLP(tx.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </main>

      <AnimatePresence>
        {showRequest && (
          <RequestModal
            onClose={() => setShowRequest(false)}
            onConfirm={requestCredit}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const presets = [20000, 50000, 100000];

function RequestModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: (amount: number) => void;
}) {
  const [amount, setAmount] = useState(50000);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-oxford-navy/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[375px] rounded-t-[32px] bg-ghost-white p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-outfit text-xl font-bold text-oxford-navy">
            Solicitar Crédito
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-oxford-navy shadow-xs"
          >
            <IconX size={20} />
          </button>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-3">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setAmount(p)}
              className={`rounded-2xl py-3 text-sm font-bold transition-all ${
                amount === p
                  ? "bg-light-sea-green text-white soft-pill-shadow"
                  : "bg-white text-oxford-navy/60"
              }`}
            >
              {formatCLP(p)}
            </button>
          ))}
        </div>

        <div className="mb-6 rounded-2xl bg-white p-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-oxford-navy/40">
            Monto seleccionado
          </p>
          <p className="font-outfit text-3xl font-bold text-oxford-navy">
            {formatCLP(amount)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onConfirm(amount)}
          className="soft-pill-shadow w-full rounded-full bg-light-sea-green py-4 font-outfit font-bold text-white transition-all active:scale-95"
        >
          Confirmar Solicitud
        </button>
      </motion.div>
    </motion.div>
  );
}
