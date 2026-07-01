"use client";

import { IconPlus, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/mock-data";
import { formatCLP } from "@/lib/format";

const tagColors: Record<string, string> = {
  Orgánico: "bg-emerald-50 text-emerald-600",
  Local: "bg-orange-50 text-orange-600",
  Fresco: "bg-gray-50 text-gray-600",
  Artesanal: "bg-purple-50 text-purple-600",
  Campo: "bg-lime-50 text-lime-700",
  Premium: "bg-rose-50 text-rose-600",
};

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(0);

  const handleAdd = () => setAdded((n) => n + 1);

  return (
    <article className="flex items-center gap-4 border-b border-hairline/20 bg-white p-5 last:border-b-0">
      <Link href={`/product/${product.id}`} className="shrink-0">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            width={80}
            height={80}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>
      </Link>

      <div className="min-w-0 flex-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="mb-0.5 truncate font-outfit text-base font-bold leading-tight text-oxford-navy">
            {product.name}
          </h3>
        </Link>
        <p className="mb-1 font-nunito text-lg font-extrabold leading-none text-light-sea-green">
          {formatCLP(product.price)}{" "}
          <span className="text-[10px] font-normal text-oxford-navy/40">
            / {product.unit}
          </span>
        </p>
        <div className="flex items-center gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                tagColors[tag] ?? "bg-gray-50 text-gray-600"
              }`}
            >
              {tag}
            </span>
          ))}
          <div className="flex items-center gap-0.5">
            <IconStarFilled className="text-[10px] text-yellow-400" />
            <span className="text-[10px] font-bold text-oxford-navy/60">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        aria-label={`Agregar ${product.name}`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-light-sea-green text-white shadow-md transition-transform active:scale-90"
      >
        <span className="relative">
          <IconPlus size={24} />
          {added > 0 && (
            <span className="absolute -right-3 -top-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-oxford-navy px-1 text-[9px] font-bold text-white">
              {added}
            </span>
          )}
        </span>
      </button>
    </article>
  );
}
