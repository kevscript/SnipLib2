import { useToasts } from "@/hooks/useToasts";
import { AnimatePresence } from "framer-motion";

import Toast from "./Toast";

const ToastLand = () => {
  const { toasts, removeToast } = useToasts();

  return (
    <ul
      className={`absolute top-0 right-0 flex flex-col max-h-screen gap-4 p-8 overflow-hidden list-none flex-nowrap max-w-[80%] ${
        toasts && toasts.length ? "z-50" : "-z-50"
      }`}
    >
      <AnimatePresence>
        {toasts &&
          toasts.map((toast) => (
            <Toast
              key={toast.id}
              toast={toast}
              handleRemove={() => removeToast(toast.id)}
            />
          ))}
      </AnimatePresence>
    </ul>
  );
};

export default ToastLand;
