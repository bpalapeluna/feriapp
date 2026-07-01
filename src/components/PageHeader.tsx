import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  backHref?: string;
  action?: React.ReactNode;
};

export default function PageHeader({
  title,
  subtitle,
  backHref = "/marketplace",
  action,
}: PageHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-6 pb-4 pt-8">
      <Link
        href={backHref}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-light-sea-green/10 bg-white text-oxford-navy shadow-xs transition-transform active:scale-90"
      >
        <IconArrowLeft size={20} />
      </Link>
      <div className="min-w-0 flex-1">
        <h1 className="truncate font-outfit text-xl font-bold text-oxford-navy">
          {title}
        </h1>
        {subtitle && (
          <p className="truncate text-xs font-semibold text-oxford-navy/50">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </header>
  );
}
