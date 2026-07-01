"use client";

import { useMemo, useState } from "react";
import OrderCard from "@/components/OrderCard";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { customerOrders, type OrderStatus } from "@/data/mock-data";

const filters: { key: OrderStatus | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "listo", label: "Listos" },
  { key: "entregado", label: "Entregados" },
];

export default function CustomerOrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | "todos">("todos");

  const orders = useMemo(() => {
    if (filter === "todos") return customerOrders;
    return customerOrders.filter((o) => o.status === filter);
  }, [filter]);

  return (
    <div>
      <PageHeader
        title="Mis Pedidos"
        subtitle={`${customerOrders.length} pedidos en total`}
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
                : "bg-white text-oxford-navy/50 border border-hairline/40"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <main className="space-y-4 px-6">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-outfit text-lg font-bold text-oxford-navy">
              No hay pedidos aquí
            </p>
            <p className="text-sm text-oxford-navy/50">
              Cambia el filtro o haz una compra nueva
            </p>
          </div>
        ) : (
          orders.map((order, i) => (
            <Reveal key={order.id} delay={i * 0.08}>
              <OrderCard order={order} />
            </Reveal>
          ))
        )}
      </main>
    </div>
  );
}
