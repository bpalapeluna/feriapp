import type { ReactNode } from "react";
import VendorBottomNav from "@/components/vendor/VendorBottomNav";

export default function VendorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[375px] bg-ghost-white pb-32 sm:border-x sm:border-hairline/40 sm:shadow-[0_0_60px_rgba(0,50,98,0.07)]">
      {children}
      <VendorBottomNav />
    </div>
  );
}
