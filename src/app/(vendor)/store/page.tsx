"use client";

import { IconEdit, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import BottomSheet from "@/components/BottomSheet";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { categories, getVendorProducts, type Product } from "@/data/mock-data";
import { formatCLP } from "@/lib/format";

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>(() =>
    getVendorProducts("v-42"),
  );
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );

  const toggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: p.stock > 0 ? 0 : 10 } : p,
      ),
    );
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addProduct = (data: {
    name: string;
    price: number;
    unit: string;
    categoryId: string;
  }) => {
    const newProduct: Product = {
      id: `p-new-${Date.now()}`,
      name: data.name,
      description: "Producto agregado por el vendedor.",
      price: data.price,
      unit: data.unit,
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300891b?auto=format&w=400&q=80&fit=crop",
      categoryId: data.categoryId,
      tags: ["Fresco"],
      rating: 5.0,
      vendorId: "v-42",
      stock: 20,
      featured: false,
    };
    setProducts((prev) => [newProduct, ...prev]);
    setShowForm(false);
  };

  return (
    <div>
      <PageHeader
        title="Mi Tienda"
        subtitle={`${products.length} productos`}
        backHref="/dashboard"
        action={
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-light-sea-green text-white shadow-sm transition-transform active:scale-90"
          >
            <IconPlus size={22} />
          </button>
        }
      />

      <div className="px-6 pb-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar producto..."
            className="h-12 w-full rounded-2xl border border-light-sea-green/10 bg-white pl-11 pr-4 text-sm text-oxford-navy outline-none focus:ring-4 focus:ring-light-sea-green/10"
          />
          <IconSearch
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-light-sea-green"
          />
        </div>
      </div>

      <main className="space-y-3 px-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-outfit text-lg font-bold text-oxford-navy">
              No hay productos
            </p>
            <p className="text-sm text-oxford-navy/50">
              Agrega uno con el botón +
            </p>
          </div>
        ) : (
          filtered.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.05}>
              <div className="flex items-center gap-3 rounded-3xl border border-hairline/40 bg-white p-3 shadow-xs">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-outfit text-sm font-bold text-oxford-navy">
                    {product.name}
                  </h3>
                  <p className="font-nunito text-sm font-extrabold text-light-sea-green">
                    {formatCLP(product.price)}
                    <span className="text-[10px] font-normal text-oxford-navy/40">
                      {" "}
                      / {product.unit}
                    </span>
                  </p>
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                      product.stock > 0
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    {product.stock > 0 ? `Stock: ${product.stock}` : "Agotado"}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => toggleStock(product.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-ghost-white text-oxford-navy transition-transform active:scale-90"
                  >
                    <IconEdit size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-transform active:scale-90"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              </div>
            </Reveal>
          ))
        )}
      </main>

      <AddProductForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onAdd={addProduct}
      />
    </div>
  );
}

function AddProductForm({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (data: {
    name: string;
    price: number;
    unit: string;
    categoryId: string;
  }) => void;
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("kg");
  const [categoryId, setCategoryId] = useState("frutas");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;
    onAdd({ name: name.trim(), price: Number(price), unit, categoryId });
  };

  return (
    <BottomSheet open={open} onClose={onClose} title="Nuevo Producto">
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="np-name"
            className="ml-1 block text-sm font-extrabold text-oxford-navy"
          >
            Nombre
          </label>
          <input
            id="np-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Duraznos Conservero"
            className="w-full rounded-2xl border-2 border-transparent bg-white px-5 py-3.5 font-semibold text-oxford-navy outline-none focus:border-light-sea-green"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="np-price"
              className="ml-1 block text-sm font-extrabold text-oxford-navy"
            >
              Precio
            </label>
            <input
              id="np-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="1500"
              className="w-full rounded-2xl border-2 border-transparent bg-white px-5 py-3.5 font-semibold text-oxford-navy outline-none focus:border-light-sea-green"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="np-unit"
              className="ml-1 block text-sm font-extrabold text-oxford-navy"
            >
              Unidad
            </label>
            <select
              id="np-unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full rounded-2xl border-2 border-transparent bg-white px-5 py-3.5 font-semibold text-oxford-navy outline-none focus:border-light-sea-green"
            >
              <option value="kg">kg</option>
              <option value="unid">unid</option>
              <option value="lt">lt</option>
              <option value="doc">doc</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="np-category"
            className="ml-1 block text-sm font-extrabold text-oxford-navy"
          >
            Categoría
          </label>
          <select
            id="np-category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-2xl border-2 border-transparent bg-white px-5 py-3.5 font-semibold text-oxford-navy outline-none focus:border-light-sea-green"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="soft-pill-shadow w-full rounded-full bg-light-sea-green py-4 font-outfit font-bold text-white transition-all active:scale-95"
        >
          Agregar Producto
        </button>
      </form>
    </BottomSheet>
  );
}
