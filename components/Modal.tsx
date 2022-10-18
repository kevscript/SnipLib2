import { ReactNode } from "react";
import { createPortal } from "react-dom";

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
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-screen h-screen bg-black/80"
      onClick={(e) => handleClose(e, false)}
    >
      <div className="relative w-10/12 max-w-[560px] h-fit max-h-[calc(100%-96px)] overflow-y-auto overflow-x-hidden rounded bg-carbon-700 drop-shadow">
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
