import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useImperativeHandle, useState } from "react";
import CrossIcon from "./icons/Cross";
import DangerIcon from "./icons/Danger";
import InfoIcon from "./icons/Info";
import ValidIcon from "./icons/Valid";

type ToastState = {
  show: boolean;
  type: ToastType;
  title: string;
};

type ToastType = "success" | "fail" | "neutral";

type ShowToastParams = {
  type: ToastType;
  title: string;
  duration?: number;
};

const Toast = forwardRef((props, ref) => {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    title: "",
    type: "neutral",
  });

  const closeToast = () => {
    setToast({ show: false, title: "", type: "neutral" });
  };

  useImperativeHandle(ref, () => ({
    showToast: ({ type, title, duration }: ShowToastParams) => {
      setToast({ show: true, title, type });
      setTimeout(
        () => setToast({ show: false, title: "", type: "neutral" }),
        duration || 3000
      );
    },
  }));

  return (
    <>
      <AnimatePresence>
        {toast.show && (
          <motion.div
            data-cy="toast"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className={`absolute top-8 right-8 rounded z-50 flex items-center flex-nowrap bg-black drop-shadow-xl`}
          >
            <div className="flex items-center justify-center pl-4 pr-2 ">
              {toast.type === "success" && (
                <ValidIcon className="w-4 h-4 stroke-emerald-300" />
              )}
              {toast.type === "fail" && (
                <DangerIcon className="w-4 h-4 stroke-red-300" />
              )}
              {toast.type === "neutral" && (
                <InfoIcon className="w-4 h-4 stroke-white" />
              )}
            </div>
            <div
              className={`flex flex-nowrap items-center justify-between text-sm min-w-[228px] max-w-[80%] pr-2 ${
                toast.type === "success"
                  ? "text-emerald-300"
                  : toast.type === "fail"
                  ? "text-red-300"
                  : "text-white"
              }`}
            >
              <p className="py-4 pl-2 pr-4">{toast.title}</p>
              <button
                className="flex items-center justify-center w-6 h-6 cursor-pointer group"
                onClick={closeToast}
              >
                <CrossIcon className="w-4 h-4 group-hover:stroke-white stroke-gray-300" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Toast.displayName = "Toast";

export default Toast;
