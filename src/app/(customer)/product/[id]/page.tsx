"use client";

import {
  IconArrowLeft,
  IconBuildingStore,
  IconMinus,
  IconPlus,
  IconStarFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getProductById, getVendorById, products } from "@/data/mock-data";
import { formatCLP } from "@/lib/format";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const product = getProductById(params.id);
  const [qty, setQty] = useState(1);

  if (!product) return notFound();

  const vendor = getVendorById(product.vendorId);
  const related = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="pb-8">
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-oxford-navy/40 to-transparent" />
        <Link
          href="/marketplace"
          className="absolute left-5 top-16 flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/20 text-white backdrop-blur-md transition-transform active:scale-90"
        >
          <IconArrowLeft size={20} />
        </Link>
      </div>

      <div className="-mt-8 rounded-t-[32px] bg-ghost-white">
        <Reveal>
          <div className="px-6 pt-6">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-light-sea-green/10 px-2.5 py-1 text-[10px] font-bold uppercase text-light-sea-green"
                >
                  {tag}
                </span>
              ))}
              <div className="flex items-center gap-1">
                <IconStarFilled size={14} className="text-yellow-400" />
                <span className="text-xs font-bold text-oxford-navy/60">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <h1 className="font-outfit text-2xl font-bold text-oxford-navy">
              {product.name}
            </h1>
            <p className="mt-1 font-nunito text-2xl font-extrabold text-light-sea-green">
              {formatCLP(product.price)}{" "}
              <span className="text-sm font-normal text-oxford-navy/40">
                / {product.unit}
              </span>
            </p>

            <p className="mt-4 text-sm leading-relaxed text-oxford-navy/70">
              {product.description}
            </p>

            {vendor && (
              <Link
                href="/marketplace"
                className="mt-5 flex items-center gap-3 rounded-2xl border border-hairline/40 bg-white p-3 shadow-xs"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-light-sea-green/10 text-light-sea-green">
                  <IconBuildingStore size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-oxford-navy">
                    Puesto #{vendor.stallNumber}
                  </p>
                  <p className="text-xs text-oxford-navy/50">
                    {vendor.ownerName} · {vendor.feriaName}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-oxford-navy/60">
                  <IconStarFilled size={12} className="text-yellow-400" />
                  {vendor.rating}
                </span>
              </Link>
            )}

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-hairline/40 bg-white p-3">
              <span className="text-sm font-bold text-oxford-navy">
                Cantidad
              </span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-ghost-white text-oxford-navy transition-transform active:scale-90"
                >
                  <IconMinus size={18} />
                </button>
                <span className="w-6 text-center font-outfit text-lg font-bold text-oxford-navy">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-ghost-white text-oxford-navy transition-transform active:scale-90"
                >
                  <IconPlus size={18} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="sticky bottom-24 z-10 mt-6 px-6">
          <button
            type="button"
            className="soft-pill-shadow flex w-full items-center justify-center gap-2 rounded-full bg-light-sea-green py-4 font-outfit font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-light-sea-green-dark active:scale-95"
          >
            Agregar · {formatCLP(product.price * qty)}
          </button>
        </div>

        {related.length > 0 && (
          <section className="mt-8 px-4">
            <h2 className="mb-4 px-2 font-outfit text-lg font-bold text-oxford-navy">
              También te puede gustar
            </h2>
            <div className="flex flex-col gap-0 overflow-hidden rounded-3xl border border-hairline/40 bg-white shadow-sm">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
