import type { ReactNode } from "react";
import CustomerBottomNav from "@/components/customer/CustomerBottomNav";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[375px] bg-ghost-white pb-24 sm:border-x sm:border-hairline/40 sm:shadow-[0_0_60px_rgba(0,50,98,0.07)]">
      {children}
      <CustomerBottomNav />
    </div>
  );
}
