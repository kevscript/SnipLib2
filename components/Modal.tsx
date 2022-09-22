import { ReactNode } from "react";
import { createPortal } from "react-dom";
import CrossIcon from "./icons/Cross";

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const handleClose = (
    e: React.MouseEvent<HTMLDivElement>,
    propagate: boolean
  ) => {
    if (!propagate && e.target === e.currentTarget) {
      e.stopPropagation();
      onClose();
    } else if (propagate) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-screen h-screen bg-black/80"
        onClick={(e) => handleClose(e, false)}
      >
        <div className="relative  w-10/12 max-w-[768px] h-fit max-h-[calc(100%-80px)] overflow-y-auto overflow-x-hidden rounded bg-carbon-500">
          <div
            className="absolute flex items-center justify-center w-6 h-6 cursor-pointer right-2 top-2 group"
            onClick={(e) => handleClose(e, true)}
          >
            <CrossIcon className="w-5 h-5 group-hover:stroke-red-600" />
          </div>

          <div className="w-full p-8">{children}</div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
