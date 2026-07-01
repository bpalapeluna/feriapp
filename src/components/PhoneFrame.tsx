import type { ReactNode } from "react";

const PHONE_WIDTH = 430;
const PHONE_HEIGHT = 932;
const STATUS_BAR = 44;

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-y-auto bg-gradient-to-br from-slate-300 via-slate-200 to-slate-400 py-6 sm:py-10">
      <div className="my-auto">
        <div className="relative rounded-[3.4rem] bg-[#0c0c0e] p-[10px] shadow-[0_50px_90px_-20px_rgba(0,0,0,0.55)]">
          {/* side buttons */}
          <span className="absolute -left-[3px] top-[150px] h-8 w-[3px] rounded-l-sm bg-[#0c0c0e]" />
          <span className="absolute -left-[3px] top-[190px] h-14 w-[3px] rounded-l-sm bg-[#0c0c0e]" />
          <span className="absolute -left-[3px] top-[260px] h-14 w-[3px] rounded-l-sm bg-[#0c0c0e]" />
          <span className="absolute -right-[3px] top-[220px] h-20 w-[3px] rounded-r-sm bg-[#0c0c0e]" />

          {/* screen */}
          <div
            className="relative overflow-hidden rounded-[2.7rem] bg-ghost-white"
            style={{ width: PHONE_WIDTH, height: PHONE_HEIGHT }}
          >
            {/* dynamic island */}
            <div className="absolute left-1/2 top-2.5 z-[80] h-[30px] w-[115px] -translate-x-1/2 rounded-full bg-black" />

            {/* status bar */}
            <div
              className="absolute inset-x-0 top-0 z-[70] flex items-center justify-between px-9 pt-2.5 text-oxford-navy"
              style={{ height: STATUS_BAR }}
            >
              <span className="text-[15px] font-semibold tracking-tight">
                9:41
              </span>
              <div className="flex items-center gap-1.5">
                <CellularIcon />
                <WifiIcon />
                <BatteryIcon />
              </div>
            </div>

            {/* scroll area (content lives below the status bar) */}
            <div
              className="absolute inset-x-0 bottom-0 overflow-y-auto overflow-x-hidden no-scrollbar"
              style={{ top: STATUS_BAR }}
            >
              {children}
            </div>

            {/* portal target for modals / bottom sheets (covers the whole screen) */}
            <div
              id="phone-portal"
              className="pointer-events-none absolute inset-0 z-[90]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CellularIcon() {
  return (
    <svg
      role="img"
      aria-label="Señal"
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="currentColor"
    >
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5" width="3" height="7" rx="1" />
      <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg
      role="img"
      aria-label="Wi-Fi"
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="currentColor"
    >
      <path d="M8 11.5 9.6 9.3a2 2 0 0 0-3.2 0L8 11.5Z" />
      <path
        d="M3.4 6.9c2.5-2.4 6.7-2.4 9.2 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M1 4.1c4-3.8 10-3.8 14 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg
      role="img"
      aria-label="Batería"
      width="26"
      height="13"
      viewBox="0 0 26 13"
      fill="none"
    >
      <rect
        x="0.5"
        y="0.5"
        width="22"
        height="12"
        rx="3"
        stroke="currentColor"
        opacity="0.4"
      />
      <rect x="2" y="2" width="16" height="9" rx="1.5" fill="currentColor" />
      <rect
        x="24"
        y="4"
        width="2"
        height="5"
        rx="1"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  );
}
