"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import OrderCard from "@/components/OrderCard";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import {
  vendorOrders as initialOrders,
  type Order,
  type OrderStatus,
} from "@/data/mock-data";

const filters: { key: OrderStatus | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "pendiente", label: "Pendientes" },
  { key: "preparando", label: "Preparando" },
  { key: "listo", label: "Listos" },
];

const nextStatus: Record<OrderStatus, OrderStatus | null> = {
  pendiente: "preparando",
  preparando: "listo",
  listo: "entregado",
  entregado: null,
  cancelado: null,
};

const actionLabel: Partial<Record<OrderStatus, string>> = {
  pendiente: "Aceptar pedido",
  preparando: "Marcar listo",
  listo: "Marcar entregado",
};

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filter, setFilter] = useState<OrderStatus | "todos">("todos");

  const filtered = useMemo(() => {
    if (filter === "todos") return orders;
    return orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  const advance = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next = nextStatus[o.status];
        return next ? { ...o, status: next } : o;
      }),
    );
  };

  return (
    <div>
      <PageHeader
        title="Pedidos"
        subtitle={`${orders.filter((o) => o.status === "pendiente").length} pendientes`}
        backHref="/dashboard"
      />

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-6 pb-4">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${
              filter === f.key
                ? "bg-light-sea-green text-white soft-pill-shadow"
                : "border border-hairline/40 bg-white text-oxford-navy/50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <main className="space-y-4 px-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-outfit text-lg font-bold text-oxford-navy">
              No hay pedidos aquí
            </p>
            <p className="text-sm text-oxford-navy/50">Cambia el filtro</p>
          </div>
        ) : (
          filtered.map((order, i) => {
            const next = nextStatus[order.status];
            const label = actionLabel[order.status];
            return (
              <Reveal key={order.id} delay={i * 0.08}>
                <div className="space-y-2">
                  <OrderCard order={order} showCustomer />
                  {next && label && (
                    <motion.button
                      type="button"
                      onClick={() => advance(order.id)}
                      whileTap={{ scale: 0.96 }}
                      className="soft-pill-shadow w-full rounded-2xl bg-oxford-navy py-3 font-outfit text-sm font-bold text-white transition-all"
                    >
                      {label}
                    </motion.button>
                  )}
                </div>
              </Reveal>
            );
          })
        )}
      </main>
    </div>
  );
}
