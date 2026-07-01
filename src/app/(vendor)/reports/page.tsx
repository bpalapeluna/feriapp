import {
  IconChartBar,
  IconCoin,
  IconShoppingCart,
  IconTrendingUp,
} from "@tabler/icons-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { salesData, topProducts } from "@/data/mock-data";
import { formatCLP } from "@/lib/format";

export default function ReportsPage() {
  const totalRevenue = salesData.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = salesData.reduce((s, d) => s + d.orders, 0);
  const avgTicket = Math.round(totalRevenue / totalOrders);
  const maxRevenue = Math.max(...salesData.map((d) => d.revenue));

  return (
    <div>
      <PageHeader
        title="Reportes"
        subtitle="Últimos 7 días"
        backHref="/dashboard"
      />

      <main className="space-y-6 px-6">
        <Reveal>
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              icon={IconCoin}
              label="Ingresos"
              value={formatCLP(totalRevenue)}
              accent
            />
            <StatCard
              icon={IconShoppingCart}
              label="Pedidos"
              value={String(totalOrders)}
            />
            <StatCard
              icon={IconTrendingUp}
              label="Ticket prom."
              value={formatCLP(avgTicket)}
            />
            <StatCard
              icon={IconChartBar}
              label="Mejor día"
              value={formatCLP(maxRevenue)}
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bento-card p-6">
            <h3 className="mb-6 font-outfit text-sm font-bold text-oxford-navy">
              Ingresos diarios
            </h3>
            <div className="flex h-40 items-end justify-between gap-2">
              {salesData.map((d) => {
                const height = (d.revenue / maxRevenue) * 100;
                return (
                  <div
                    key={d.day}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <span className="text-[9px] font-bold text-oxford-navy/50">
                      {Math.round(d.revenue / 1000)}k
                    </span>
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-light-sea-green to-light-sea-green/40 transition-all"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-oxford-navy/60">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="space-y-3 pb-6">
            <h3 className="ml-1 text-[10px] font-bold uppercase tracking-[0.2em] text-oxford-navy/40">
              Productos top
            </h3>
            <div className="overflow-hidden rounded-3xl border border-hairline/40 bg-white shadow-xs">
              {topProducts.map((p, i) => (
                <div
                  key={p.productId}
                  className={`flex items-center gap-4 p-4 ${
                    i === topProducts.length - 1
                      ? ""
                      : "border-b border-hairline/20"
                  }`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-light-sea-green/10 font-outfit text-sm font-bold text-light-sea-green">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-oxford-navy">
                      {p.name}
                    </p>
                    <p className="text-[11px] text-oxford-navy/50">
                      {p.units} unidades vendidas
                    </p>
                  </div>
                  <span className="font-outfit text-sm font-bold text-light-sea-green">
                    {formatCLP(p.revenue)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof IconCoin;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-[2rem] p-5 ${
        accent
          ? "bg-light-sea-green text-white shadow-lg shadow-teal-500/10"
          : "bento-card"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          accent ? "bg-white/20" : "bg-light-sea-green/10 text-light-sea-green"
        }`}
      >
        <Icon size={22} />
      </div>
      <div>
        <span
          className={`block font-outfit text-xl font-bold ${
            accent ? "text-white" : "text-oxford-navy"
          }`}
        >
          {value}
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-wider ${
            accent ? "text-white/70" : "text-oxford-navy/40"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
