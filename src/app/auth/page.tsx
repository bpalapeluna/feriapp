"use client";

import {
  IconBasket,
  IconBrandWhatsapp,
  IconBuildingStore,
  IconCarrot,
  IconHelp,
  IconLeaf,
  IconLock,
  IconMail,
  IconShoppingBag,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
  useId,
  useState,
} from "react";
import { useRole } from "@/components/RoleProvider";

type Tab = "login" | "register";

export default function AuthPage() {
  const router = useRouter();
  const { role, setRole } = useRole();
  const [tab, setTab] = useState<Tab>("login");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(role === "feriante" ? "/dashboard" : "/marketplace");
  };

  return (
    <section className="flex min-h-screen select-none flex-col items-center justify-start overflow-x-clip bg-ghost-white px-5 pb-16 pt-12">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mb-8 w-full max-w-[375px]"
      >
        <div className="group relative h-40 w-full overflow-hidden rounded-[32px] border border-oxford-navy/5 shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1758184449358-ac6f5dcd8e04?auto=format&w=600&q=80&fit=crop"
            alt="Street Market Vendor Scene"
            fill
            className="object-cover grayscale-[10%] transition-all duration-700 group-hover:grayscale-0"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-oxford-navy/70 to-transparent" />
          <div className="absolute bottom-6 left-8">
            <h1 className="font-outfit text-3xl font-bold tracking-tight text-white">
              FeriApp
            </h1>
            <p className="text-sm font-semibold text-white/80">
              Tu mercado digital
            </p>
          </div>
          <div className="absolute right-8 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md">
            <IconBuildingStore size={24} className="text-white" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="custom-shadow w-full max-w-[375px] overflow-hidden rounded-[40px] border border-oxford-navy/5 bg-white"
      >
        <div className="p-6 pb-2">
          <div className="flex rounded-2xl border border-oxford-navy/5 bg-ghost-white p-1.5">
            <TabButton active={tab === "login"} onClick={() => setTab("login")}>
              Iniciar Sesión
            </TabButton>
            <TabButton
              active={tab === "register"}
              onClick={() => setTab("register")}
            >
              Registrarme
            </TabButton>
          </div>

          <div className="mt-4">
            <p className="mb-2 ml-1 text-[11px] font-bold uppercase tracking-widest text-oxford-navy/40">
              Ingresar como
            </p>
            <div className="grid grid-cols-2 gap-3">
              <RoleOption
                active={role === "cliente"}
                onClick={() => setRole("cliente")}
                icon={IconShoppingBag}
                label="Cliente"
                hint="Comprar en la feria"
              />
              <RoleOption
                active={role === "feriante"}
                onClick={() => setRole("feriante")}
                icon={IconBuildingStore}
                label="Feriante"
                hint="Gestionar mi puesto"
              />
            </div>
          </div>
        </div>

        <div className="p-8 pt-4">
          <AnimatePresence mode="wait">
            {tab === "login" ? (
              <motion.form
                key="login"
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Field label="Email o RUT" icon={IconUserCircle}>
                  <input
                    type="text"
                    placeholder="Ej: 12.345.678-9"
                    className="w-full bg-transparent px-5 py-4 font-semibold text-oxford-navy outline-none placeholder:text-oxford-navy/60"
                  />
                </Field>

                <Field label="Contraseña" icon={IconLock}>
                  <input
                    type="password"
                    placeholder="Tu contraseña"
                    className="w-full bg-transparent px-5 py-4 font-semibold text-oxford-navy outline-none placeholder:text-oxford-navy/60"
                  />
                </Field>

                <div className="flex items-center justify-between px-1">
                  <label className="group flex cursor-pointer items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded-md border-2 border-light-sea-green/30 text-light-sea-green focus:ring-0"
                    />
                    <span className="text-xs font-bold text-oxford-navy/70 transition-colors group-hover:text-oxford-navy">
                      Recordarme
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-xs font-bold text-light-sea-green hover:underline"
                  >
                    ¿Olvidaste la clave?
                  </button>
                </div>

                <SubmitButton>Iniciar Sesión</SubmitButton>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                onSubmit={handleSubmit}
                className="space-y-5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Field label="Nombre Completo" icon={IconUser}>
                  <input
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    className="w-full bg-transparent px-5 py-4 font-semibold text-oxford-navy outline-none placeholder:text-oxford-navy/60"
                  />
                </Field>

                <Field label="RUT" icon={IconUserCircle}>
                  <input
                    type="text"
                    placeholder="Ej: 12.345.678-9"
                    className="w-full bg-transparent px-5 py-4 font-semibold text-oxford-navy outline-none placeholder:text-oxford-navy/60"
                  />
                </Field>

                <Field label="Correo Electrónico" icon={IconMail}>
                  <input
                    type="email"
                    placeholder="email@ejemplo.com"
                    className="w-full bg-transparent px-5 py-4 font-semibold text-oxford-navy outline-none placeholder:text-oxford-navy/60"
                  />
                </Field>

                <Field label="Crear Contraseña" icon={IconLock}>
                  <input
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    className="w-full bg-transparent px-5 py-4 font-semibold text-oxford-navy outline-none placeholder:text-oxford-navy/60"
                  />
                </Field>

                <SubmitButton>Comenzar Registro</SubmitButton>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="border-t border-oxford-navy/5 bg-ghost-white p-6 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-oxford-navy/60">
            ¿Necesitas ayuda?
          </p>
          <div className="flex justify-center space-x-8">
            <SupportLink icon={IconBrandWhatsapp} label="Soporte" />
            <SupportLink icon={IconHelp} label="Guía" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="pointer-events-none mt-12 flex justify-center space-x-8 opacity-30"
      >
        <IconLeaf size={40} className="text-light-sea-green" />
        <IconBasket size={40} className="text-light-sea-green" />
        <IconCarrot size={40} className="text-light-sea-green" />
      </motion.div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-xl py-3.5 text-sm font-extrabold transition-all duration-300 ${
        active
          ? "bg-white text-light-sea-green shadow-sm"
          : "text-oxford-navy/60 hover:text-oxford-navy"
      }`}
    >
      {children}
    </button>
  );
}

function RoleOption({
  active,
  onClick,
  icon: Icon,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof IconUser;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1 rounded-2xl border-2 p-3 text-center transition-all duration-300 ${
        active
          ? "border-light-sea-green bg-light-sea-green/8 shadow-sm"
          : "border-transparent bg-ghost-white hover:border-light-sea-green/30"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
          active
            ? "bg-light-sea-green text-white"
            : "bg-white text-oxford-navy/50"
        }`}
      >
        <Icon size={22} />
      </div>
      <span
        className={`text-sm font-extrabold ${
          active ? "text-light-sea-green" : "text-oxford-navy/70"
        }`}
      >
        {label}
      </span>
      <span className="text-[10px] font-semibold leading-tight text-oxford-navy/40">
        {hint}
      </span>
    </button>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: typeof IconUser;
  children: ReactNode;
}) {
  const id = useId();
  const child = Children.only(children);
  const input = isValidElement<{ id?: string }>(child)
    ? cloneElement(child, { id })
    : child;
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="ml-1 block text-sm font-extrabold text-oxford-navy"
      >
        {label}
      </label>
      <div className="input-focus-effect group relative flex items-center overflow-hidden rounded-2xl border-2 border-transparent bg-ghost-white transition-all">
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-oxford-navy/60 transition-colors group-focus-within:text-light-sea-green">
          <Icon size={22} />
        </div>
        <div className="w-full pl-12">{input}</div>
      </div>
    </div>
  );
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="soft-pill-shadow w-full rounded-full bg-light-sea-green py-4.5 text-white font-extrabold transition-all duration-300 hover:-translate-y-0.5 hover:bg-light-sea-green-dark active:translate-y-0 active:scale-95"
    >
      {children}
    </button>
  );
}

function SupportLink({
  icon: Icon,
  label,
}: {
  icon: typeof IconUser;
  label: string;
}) {
  return (
    <button type="button" className="group flex flex-col items-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-light-sea-green shadow-sm transition-all duration-300 group-hover:bg-light-sea-green group-hover:text-white">
        <Icon size={22} />
      </div>
      <span className="mt-2 text-xs font-extrabold text-oxford-navy/70">
        {label}
      </span>
    </button>
  );
}
