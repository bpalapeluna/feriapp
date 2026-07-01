import type { ReactNode } from "react";
import VendorBottomNav from "@/components/vendor/VendorBottomNav";

export default function VendorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full w-full flex-col bg-ghost-white">
      <div className="flex-1 pb-4">{children}</div>
      <VendorBottomNav />
    </div>
  );
}
