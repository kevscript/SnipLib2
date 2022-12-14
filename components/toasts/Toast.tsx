import { Toast } from "@/hooks/useToasts";
import { motion } from "framer-motion";
import CrossIcon from "../icons/Cross";
import DangerIcon from "../icons/Danger";
import InfoIcon from "../icons/Info";
import ValidIcon from "../icons/Valid";

type ToastProps = {
  toast: Toast;
  handleRemove: () => void;
};

const Toast = ({ toast, handleRemove }: ToastProps) => {
  return (
    <motion.li
      className="flex items-center bg-black rounded flex-nowrap drop-shadow-xl w-fit"
      key={toast.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      layout
      data-cy={`toast-${toast.type}`}
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
        className={`flex flex-nowrap items-center justify-between text-sm min-w-[228px] pr-2 ${
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
          onClick={handleRemove}
        >
          <CrossIcon className="w-4 h-4 group-hover:stroke-white stroke-gray-300" />
        </button>
      </div>
    </motion.li>
  );
};

export default Toast;
