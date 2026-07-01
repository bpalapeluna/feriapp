"use client";

import {
  IconAdjustmentsHorizontal,
  IconBell,
  IconSearch,
  IconShoppingBag,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { categoryIcons } from "@/components/icons";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import {
  categories,
  getFeaturedProducts,
  getProductsByCategory,
  products,
} from "@/data/mock-data";

export default function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("frutas");

  const visibleProducts = useMemo(() => {
    if (query.trim()) {
      const q = query.toLowerCase();
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    if (activeCategory === "frutas") {
      const featured = getFeaturedProducts();
      const rest = getProductsByCategory("frutas").filter((p) => !p.featured);
      return [...featured, ...rest];
    }
    return getProductsByCategory(activeCategory);
  }, [query, activeCategory]);

  return (
    <div>
      <TopNav />

      <header className="relative w-full overflow-hidden bg-white py-12 px-6">
        <div className="relative z-10 mx-auto flex max-w-md flex-col items-center">
          <Reveal>
            <h1 className="mb-8 text-center font-outfit text-3xl font-bold tracking-tight text-oxford-navy">
              ¡Hola! Busquemos lo mejor de la feria
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="group relative w-full">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca frutas, verduras o locales..."
                className="h-14 w-full rounded-2xl border border-light-sea-green/10 bg-ghost-white pl-12 pr-6 font-nunito text-base text-oxford-navy outline-none transition-all focus:ring-4 focus:ring-light-sea-green/10"
              />
              <IconSearch
                size={22}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-light-sea-green"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-white text-light-sea-green shadow-xs"
              >
                <IconAdjustmentsHorizontal size={20} />
              </button>
            </div>
          </Reveal>
        </div>
      </header>

      {!query.trim() && (
        <section className="relative z-10 w-full bg-white py-6">
          <div className="no-scrollbar flex gap-8 overflow-x-auto px-6">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.icon];
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className="group flex shrink-0 cursor-pointer flex-col items-center gap-3"
                >
                  <div
                    className={`flex h-18 w-18 items-center justify-center rounded-3xl border-2 p-1.5 transition-transform group-active:scale-95 ${
                      active
                        ? "border-light-sea-green bg-white shadow-sm"
                        : "border-transparent bg-ghost-white"
                    }`}
                  >
                    <div
                      className={`flex h-full w-full items-center justify-center rounded-2xl ${
                        active
                          ? "bg-light-sea-green/10 text-light-sea-green"
                          : "bg-white text-oxford-navy/40"
                      }`}
                    >
                      {Icon ? <Icon size={32} /> : null}
                    </div>
                  </div>
                  <span
                    className={`text-[12px] font-bold ${
                      active
                        ? "font-outfit text-oxford-navy"
                        : "font-nunito font-semibold text-oxford-navy/40"
                    }`}
                  >
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <main className="w-full px-4 pt-4">
        <div className="mb-6 flex items-center justify-between px-2">
          <h2 className="font-outfit text-2xl font-bold text-oxford-navy">
            {query.trim() ? "Resultados" : "Destacados de hoy"}
          </h2>
          {!query.trim() && (
            <button
              type="button"
              className="text-sm font-bold text-light-sea-green"
            >
              Ver todo
            </button>
          )}
        </div>

        {visibleProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <IconSearch size={48} className="mb-4 text-oxford-navy/20" />
            <p className="font-outfit text-lg font-bold text-oxford-navy">
              No encontramos productos
            </p>
            <p className="text-sm text-oxford-navy/50">
              Intenta con otra búsqueda o categoría
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-0 overflow-hidden rounded-3xl border border-hairline/40 bg-white shadow-sm">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function TopNav() {
  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-light-sea-green/10 bg-ghost-white/80 px-6 py-4 backdrop-blur-md">
      <Link href="/marketplace" className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-light-sea-green shadow-sm">
          <IconShoppingBag size={22} className="text-white" />
        </div>
        <span className="font-outfit text-2xl font-bold tracking-tight text-oxford-navy">
          FeriApp
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href="/coupons"
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-oxford-navy shadow-xs"
        >
          <IconBell size={22} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-white bg-red-500" />
        </Link>
        <Link href="/profile">
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-light-sea-green/20 shadow-xs">
            <Image
              src="https://i.pravatar.cc/100?u=vendor"
              alt="User Profile"
              width={40}
              height={40}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
        </Link>
      </div>
    </nav>
  );
}
