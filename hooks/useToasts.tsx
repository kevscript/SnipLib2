import { createContext, useContext, ReactNode, useState } from "react";

type ToastType = "success" | "fail" | "neutral";

export type Toast = {
  type: ToastType;
  id: number;
  title: string;
};

export type ToastsContext = {
  toasts: Toast[];
  addToast: (newToast: Toast, duration?: number) => void;
  removeToast: (id: number) => void;
};

// const testToasts: Toast[] = [
//   { id: 1, title: "Hello", type: "success" },
//   { id: 2, title: "Hello", type: "neutral" },
//   { id: 3, title: "Hello", type: "fail" },
// ];

const useToastsProvider = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function removeToast(id: number) {
    setToasts((toasts) => toasts.filter((t) => t.id !== id));
  }

  function addToast(newToast: Toast, duration?: number) {
    setToasts((toasts) => [...toasts, newToast]);
    setTimeout(() => removeToast(newToast.id), duration || 3000);
  }

  return { toasts, addToast, removeToast };
};

const toastsContext = createContext({} as ToastsContext);

export const ToastsProvider = ({ children }: { children: ReactNode }) => {
  const data = useToastsProvider();

  return (
    <toastsContext.Provider value={data}>{children}</toastsContext.Provider>
  );
};

export const useToasts = () => useContext(toastsContext);
