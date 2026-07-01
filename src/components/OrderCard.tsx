import Image from "next/image";
import StatusBadge from "@/components/StatusBadge";
import type { Order } from "@/data/mock-data";
import { formatCLP, formatDate } from "@/lib/format";

type OrderCardProps = {
  order: Order;
  showCustomer?: boolean;
};

export default function OrderCard({
  order,
  showCustomer = false,
}: OrderCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-hairline/40 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-hairline/20 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="font-outfit text-sm font-bold text-oxford-navy">
            {order.code}
          </span>
          <StatusBadge status={order.status} />
        </div>
        <span className="text-[11px] font-semibold text-oxford-navy/40">
          {formatDate(order.date)} · {order.pickupTime}
        </span>
      </div>

      {showCustomer && (
        <div className="flex items-center gap-3 border-b border-hairline/20 bg-ghost-white/50 px-5 py-3">
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={order.customerAvatar}
              alt={order.customerName}
              width={32}
              height={32}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
          <span className="text-sm font-bold text-oxford-navy">
            {order.customerName}
          </span>
        </div>
      )}

      <div className="divide-y divide-hairline/20">
        {order.items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-3 px-5 py-3"
          >
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-oxford-navy">
                {item.name}
              </p>
              <p className="text-xs text-oxford-navy/50">
                {item.quantity} × {formatCLP(item.price)}
              </p>
            </div>
            <span className="font-outfit text-sm font-bold text-light-sea-green">
              {formatCLP(item.quantity * item.price)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between bg-ghost-white/50 px-5 py-3">
        <span className="text-xs font-bold uppercase tracking-wider text-oxford-navy/50">
          Total
        </span>
        <span className="font-outfit text-lg font-bold text-oxford-navy">
          {formatCLP(order.total)}
        </span>
      </div>
    </div>
  );
}
