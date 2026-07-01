import type { ReactNode } from "react";
import CustomerBottomNav from "@/components/customer/CustomerBottomNav";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full w-full flex-col bg-ghost-white">
      <div className="flex-1 pb-4">{children}</div>
      <CustomerBottomNav />
    </div>
  );
}
