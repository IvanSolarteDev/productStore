import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {

  if (!isOpen) return null;

  // Portal al <body>: evita que un ancestro con backdrop-blur/transform desplace el "fixed"
  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] flex h-dvh w-screen items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-fit max-w-[95vw]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-white font-bold shadow"
        >
          ✕
        </button>
        <div className="max-h-[85vh] overflow-auto rounded-2xl">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};
