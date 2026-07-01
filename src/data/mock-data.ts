// ============================================================================
// FeriApp - Mock Data
// ----------------------------------------------------------------------------
// Edit this file to change, add, or remove test data. No database needed.
// All types are defined here so the rest of the app stays type-safe.
// ============================================================================

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  categoryId: string;
  tags: string[];
  rating: number;
  vendorId: string;
  stock: number;
  featured: boolean;
};

export type Vendor = {
  id: string;
  stallNumber: number;
  feriaName: string;
  ownerName: string;
  avatar: string;
  rating: number;
};

export type OrderStatus =
  | "pendiente"
  | "preparando"
  | "listo"
  | "entregado"
  | "cancelado";

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

export type Order = {
  id: string;
  code: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  customerName: string;
  customerAvatar: string;
  vendorId: string;
  date: string;
  pickupTime: string;
};

export type Coupon = {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  expiry: string;
  categoryId: string;
  used: boolean;
};

export type CreditTransaction = {
  id: string;
  type: "credito" | "pago";
  description: string;
  amount: number;
  date: string;
};

export type CreditInfo = {
  available: number;
  debtPaidPercent: number;
  debtTotal: number;
  nextPaymentDate: string;
  nextPaymentAmount: number;
  cardActive: boolean;
  cardNumber: string;
  history: CreditTransaction[];
};

export type SalesPoint = {
  day: string;
  revenue: number;
  orders: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  rut: string;
  phone: string;
  avatar: string;
  role: "customer" | "vendor";
  address: string;
  joinedDate: string;
};

// ----------------------------------------------------------------------------
// Categories
// ----------------------------------------------------------------------------
export const categories: Category[] = [
  { id: "frutas", name: "Frutas", icon: "IconApple" },
  { id: "verduras", name: "Verduras", icon: "IconCarrot" },
  { id: "panaderia", name: "Panadería", icon: "IconBread" },
  { id: "lacteos", name: "Lácteos", icon: "IconBottle" },
  { id: "carnes", name: "Carnes", icon: "IconMeat" },
];

// ----------------------------------------------------------------------------
// Vendors / Stalls
// ----------------------------------------------------------------------------
export const vendors: Vendor[] = [
  {
    id: "v-42",
    stallNumber: 42,
    feriaName: "Feria Iquique",
    ownerName: "Juan Pérez",
    avatar: "https://i.pravatar.cc/200?u=juan",
    rating: 4.8,
  },
  {
    id: "v-17",
    stallNumber: 17,
    feriaName: "Feria Iquique",
    ownerName: "María Soto",
    avatar: "https://i.pravatar.cc/200?u=maria",
    rating: 4.6,
  },
];

// ----------------------------------------------------------------------------
// Products
// ----------------------------------------------------------------------------
export const products: Product[] = [
  {
    id: "p-1",
    name: "Pack Mix Frutal Premium",
    description:
      "Selección de frutas de temporada: manzanas, peras, uvas y kiwi. Ideal para la semana.",
    price: 4500,
    unit: "unid",
    image:
      "https://images.unsplash.com/photo-1760705186373-f0fccf98b88c?auto=format&w=400&q=80&fit=crop",
    categoryId: "frutas",
    tags: ["Orgánico"],
    rating: 4.9,
    vendorId: "v-42",
    stock: 24,
    featured: true,
  },
  {
    id: "p-2",
    name: "Naranjas de Temporada",
    description: "Naranjas jugosas recién cosechadas en el valle de Limarí.",
    price: 1200,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1762474453560-5cf30f20bc8e?auto=format&w=400&q=80&fit=crop",
    categoryId: "frutas",
    tags: ["Local"],
    rating: 4.7,
    vendorId: "v-42",
    stock: 60,
    featured: true,
  },
  {
    id: "p-3",
    name: "Papas Amarillas XL",
    description: "Papas amarillas grandes, perfectas para cocino y fritura.",
    price: 950,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1763054760673-bd6866c35d48?auto=format&w=400&q=80&fit=crop",
    categoryId: "verduras",
    tags: ["Fresco"],
    rating: 4.5,
    vendorId: "v-42",
    stock: 80,
    featured: true,
  },
  {
    id: "p-4",
    name: "Palta Hass Selección",
    description: "Palta Hass en punto perfecto. Cosechada en La Serena.",
    price: 5900,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1771574207594-bd699319b900?auto=format&w=400&q=80&fit=crop",
    categoryId: "verduras",
    tags: ["Orgánico"],
    rating: 5.0,
    vendorId: "v-17",
    stock: 30,
    featured: true,
  },
  {
    id: "p-5",
    name: "Pan Amasado Casero",
    description: "Pan amasado hecho al horno de barro, 12 unidades.",
    price: 2500,
    unit: "unid",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&w=400&q=80&fit=crop",
    categoryId: "panaderia",
    tags: ["Artesanal"],
    rating: 4.8,
    vendorId: "v-17",
    stock: 18,
    featured: true,
  },
  {
    id: "p-6",
    name: "Leche Fresca Entera",
    description: "Leche fresca pasteurizada, 1 litro. De granja local.",
    price: 1100,
    unit: "lt",
    image:
      "https://images.unsplash.com/photo-1563636613-e9e0056d822b?auto=format&w=400&q=80&fit=crop",
    categoryId: "lacteos",
    tags: ["Local", "Fresco"],
    rating: 4.6,
    vendorId: "v-17",
    stock: 40,
    featured: true,
  },
  {
    id: "p-7",
    name: "Huevos Campo XL",
    description: "Huevos de gallinas libres, docena.",
    price: 3200,
    unit: "doc",
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&w=400&q=80&fit=crop",
    categoryId: "lacteos",
    tags: ["Orgánico", "Campo"],
    rating: 4.9,
    vendorId: "v-42",
    stock: 25,
    featured: false,
  },
  {
    id: "p-8",
    name: "Tomates Larga Vida",
    description: "Tomates maduros en rama, ideales para ensaladas y salsas.",
    price: 1400,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1546470427-e26264be0b0d?auto=format&w=400&q=80&fit=crop",
    categoryId: "verduras",
    tags: ["Fresco"],
    rating: 4.4,
    vendorId: "v-42",
    stock: 50,
    featured: false,
  },
  {
    id: "p-9",
    name: "Pollo Entero de Campo",
    description: "Pollo criado al aire libre, sin antibióticos. ~1.8 kg.",
    price: 6800,
    unit: "unid",
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&w=400&q=80&fit=crop",
    categoryId: "carnes",
    tags: ["Campo"],
    rating: 4.7,
    vendorId: "v-17",
    stock: 12,
    featured: false,
  },
  {
    id: "p-10",
    name: "Manzanas Fuji",
    description: "Manzanas Fuji crujientes y dulces. Cosechadas en Curicó.",
    price: 1800,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&w=400&q=80&fit=crop",
    categoryId: "frutas",
    tags: ["Local"],
    rating: 4.6,
    vendorId: "v-42",
    stock: 45,
    featured: false,
  },
  {
    id: "p-11",
    name: "Maraqueta Recién Horneada",
    description: "Maraqueta crujiente del día, 6 unidades.",
    price: 1800,
    unit: "unid",
    image:
      "https://images.unsplash.com/photo-1586444248902-39f8597567ce?auto=format&w=400&q=80&fit=crop",
    categoryId: "panaderia",
    tags: ["Fresco"],
    rating: 4.5,
    vendorId: "v-17",
    stock: 22,
    featured: false,
  },
  {
    id: "p-12",
    name: "Carne Molida Premium",
    description: "Carne molida de lomo liso, 100% vacuno. 500 g.",
    price: 4200,
    unit: "unid",
    image:
      "https://images.unsplash.com/photo-1603048719571-0f9c7b5c5e5e?auto=format&w=400&q=80&fit=crop",
    categoryId: "carnes",
    tags: ["Premium"],
    rating: 4.7,
    vendorId: "v-17",
    stock: 16,
    featured: false,
  },
];

// ----------------------------------------------------------------------------
// Orders
// ----------------------------------------------------------------------------
export const customerOrders: Order[] = [
  {
    id: "o-1",
    code: "#FER-1042",
    items: [
      {
        productId: "p-1",
        name: "Pack Mix Frutal Premium",
        quantity: 1,
        price: 4500,
        image: products[0].image,
      },
      {
        productId: "p-2",
        name: "Naranjas de Temporada",
        quantity: 2,
        price: 1200,
        image: products[1].image,
      },
    ],
    total: 6900,
    status: "listo",
    customerName: "Tú",
    customerAvatar: "https://i.pravatar.cc/100?u=me",
    vendorId: "v-42",
    date: "2026-06-30",
    pickupTime: "14:30",
  },
  {
    id: "o-2",
    code: "#FER-1031",
    items: [
      {
        productId: "p-5",
        name: "Pan Amasado Casero",
        quantity: 2,
        price: 2500,
        image: products[4].image,
      },
    ],
    total: 5000,
    status: "entregado",
    customerName: "Tú",
    customerAvatar: "https://i.pravatar.cc/100?u=me",
    vendorId: "v-17",
    date: "2026-06-28",
    pickupTime: "10:00",
  },
  {
    id: "o-3",
    code: "#FER-1020",
    items: [
      {
        productId: "p-4",
        name: "Palta Hass Selección",
        quantity: 1,
        price: 5900,
        image: products[3].image,
      },
      {
        productId: "p-7",
        name: "Huevos Campo XL",
        quantity: 1,
        price: 3200,
        image: products[6].image,
      },
    ],
    total: 9100,
    status: "entregado",
    customerName: "Tú",
    customerAvatar: "https://i.pravatar.cc/100?u=me",
    vendorId: "v-17",
    date: "2026-06-22",
    pickupTime: "11:15",
  },
];

export const vendorOrders: Order[] = [
  {
    id: "vo-1",
    code: "#FER-1043",
    items: [
      {
        productId: "p-1",
        name: "Pack Mix Frutal Premium",
        quantity: 2,
        price: 4500,
        image: products[0].image,
      },
    ],
    total: 9000,
    status: "pendiente",
    customerName: "Camila Rojas",
    customerAvatar: "https://i.pravatar.cc/100?u=camila",
    vendorId: "v-42",
    date: "2026-06-30",
    pickupTime: "15:00",
  },
  {
    id: "vo-2",
    code: "#FER-1044",
    items: [
      {
        productId: "p-2",
        name: "Naranjas de Temporada",
        quantity: 3,
        price: 1200,
        image: products[1].image,
      },
      {
        productId: "p-10",
        name: "Manzanas Fuji",
        quantity: 2,
        price: 1800,
        image: products[9].image,
      },
    ],
    total: 7200,
    status: "pendiente",
    customerName: "Diego Muñoz",
    customerAvatar: "https://i.pravatar.cc/100?u=diego",
    vendorId: "v-42",
    date: "2026-06-30",
    pickupTime: "16:30",
  },
  {
    id: "vo-3",
    code: "#FER-1045",
    items: [
      {
        productId: "p-3",
        name: "Papas Amarillas XL",
        quantity: 4,
        price: 950,
        image: products[2].image,
      },
    ],
    total: 3800,
    status: "preparando",
    customerName: "Sofía Vidal",
    customerAvatar: "https://i.pravatar.cc/100?u=sofia",
    vendorId: "v-42",
    date: "2026-06-30",
    pickupTime: "14:00",
  },
  {
    id: "vo-4",
    code: "#FER-1038",
    items: [
      {
        productId: "p-8",
        name: "Tomates Larga Vida",
        quantity: 2,
        price: 1400,
        image: products[7].image,
      },
    ],
    total: 2800,
    status: "entregado",
    customerName: "Pedro Carrasco",
    customerAvatar: "https://i.pravatar.cc/100?u=pedro",
    vendorId: "v-42",
    date: "2026-06-29",
    pickupTime: "13:00",
  },
];

// ----------------------------------------------------------------------------
// Coupons
// ----------------------------------------------------------------------------
export const coupons: Coupon[] = [
  {
    id: "c-1",
    code: "FERIA20",
    title: "20% en Frutas",
    description: "Válido en toda la categoría de frutas frescas.",
    discountType: "percent",
    discountValue: 20,
    expiry: "2026-07-15",
    categoryId: "frutas",
    used: false,
  },
  {
    id: "c-2",
    code: "PANADERIA15",
    title: "15% en Panadería",
    description: "Descuento en pan amasado y marraquetas del día.",
    discountType: "percent",
    discountValue: 15,
    expiry: "2026-07-10",
    categoryId: "panaderia",
    used: false,
  },
  {
    id: "c-3",
    code: "BIENVENIDA",
    title: "$1.000 de regalo",
    description: "En tu primera compra sobre $5.000.",
    discountType: "fixed",
    discountValue: 1000,
    expiry: "2026-08-01",
    categoryId: "frutas",
    used: false,
  },
  {
    id: "c-4",
    code: "VERDURA10",
    title: "10% en Verduras",
    description: "Aplica en toda la sección de verduras.",
    discountType: "percent",
    discountValue: 10,
    expiry: "2026-06-25",
    categoryId: "verduras",
    used: true,
  },
];

// ----------------------------------------------------------------------------
// Credit / Debt (vendor)
// ----------------------------------------------------------------------------
export const creditInfo: CreditInfo = {
  available: 120000,
  debtPaidPercent: 65,
  debtTotal: 200000,
  nextPaymentDate: "2026-07-15",
  nextPaymentAmount: 35000,
  cardActive: true,
  cardNumber: "•••• 4521",
  history: [
    {
      id: "t-1",
      type: "credito",
      description: "Solicitud de crédito",
      amount: 120000,
      date: "2026-06-01",
    },
    {
      id: "t-2",
      type: "pago",
      description: "Pago de cuota",
      amount: 35000,
      date: "2026-06-15",
    },
    {
      id: "t-3",
      type: "pago",
      description: "Pago de cuota",
      amount: 35000,
      date: "2026-06-29",
    },
  ],
};

// ----------------------------------------------------------------------------
// Sales report (last 7 days)
// ----------------------------------------------------------------------------
export const salesData: SalesPoint[] = [
  { day: "Lun", revenue: 18400, orders: 6 },
  { day: "Mar", revenue: 22100, orders: 8 },
  { day: "Mié", revenue: 15800, orders: 5 },
  { day: "Jue", revenue: 28900, orders: 11 },
  { day: "Vie", revenue: 41200, orders: 14 },
  { day: "Sáb", revenue: 52600, orders: 19 },
  { day: "Dom", revenue: 33100, orders: 12 },
];

export const topProducts = [
  {
    productId: "p-1",
    name: "Pack Mix Frutal Premium",
    units: 42,
    revenue: 189000,
  },
  {
    productId: "p-2",
    name: "Naranjas de Temporada",
    units: 38,
    revenue: 45600,
  },
  { productId: "p-3", name: "Papas Amarillas XL", units: 31, revenue: 29450 },
];

// ----------------------------------------------------------------------------
// Users (current logged-in sessions)
// ----------------------------------------------------------------------------
export const currentUser: User = {
  id: "u-1",
  name: "Juan Pérez",
  email: "juan.perez@feriapp.cl",
  rut: "12.345.678-9",
  phone: "+56 9 8765 4321",
  avatar: "https://i.pravatar.cc/200?u=juan",
  role: "vendor",
  address: "Puesto #42, Feria Iquique",
  joinedDate: "2024-03-12",
};

// ----------------------------------------------------------------------------
// Helper selectors
// ----------------------------------------------------------------------------
export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getVendorById = (id: string): Vendor | undefined =>
  vendors.find((v) => v.id === id);

export const getCategoryById = (id: string): Category | undefined =>
  categories.find((c) => c.id === id);

export const getProductsByCategory = (categoryId: string): Product[] =>
  products.filter((p) => p.categoryId === categoryId);

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.featured);

export const getVendorProducts = (vendorId: string): Product[] =>
  products.filter((p) => p.vendorId === vendorId);

export const pendingVendorOrderCount = vendorOrders.filter(
  (o) => o.status === "pendiente",
).length;
