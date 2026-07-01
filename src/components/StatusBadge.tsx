import type { OrderStatus } from "@/data/mock-data";

const styles: Record<OrderStatus, { label: string; classes: string }> = {
  pendiente: {
    label: "Pendiente",
    classes: "bg-amber-50 text-amber-600",
  },
  preparando: {
    label: "Preparando",
    classes: "bg-sky-50 text-sky-600",
  },
  listo: {
    label: "Listo",
    classes: "bg-emerald-50 text-emerald-600",
  },
  entregado: {
    label: "Entregado",
    classes: "bg-slate-100 text-slate-500",
  },
  cancelado: {
    label: "Cancelado",
    classes: "bg-red-50 text-red-500",
  },
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const { label, classes } = styles[status];
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${classes}`}
    >
      {label}
    </span>
  );
}
