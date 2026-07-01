"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Role = "cliente" | "feriante";

const STORAGE_KEY = "feriapp-role";

type RoleContextValue = {
  role: Role;
  setRole: (role: Role) => void;
};

const RoleContext = createContext<RoleContextValue>({
  role: "cliente",
  setRole: () => {},
});

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("cliente");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "feriante" || saved === "cliente") {
      setRoleState(saved);
    }
  }, []);

  const setRole = (next: Role) => {
    setRoleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleContextValue {
  return useContext(RoleContext);
}
