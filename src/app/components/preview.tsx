"use client";

import { ReactNode } from "react";

type PreviewModalProps = {
  onClose: () => void;
  children: ReactNode;
};

export default function PreviewModal({ onClose, children }: PreviewModalProps) {
  return (
    <div
      className="fixed inset-0 bg-linear-to-t from-[var(--secondary)]/55 to-black/65 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="shadow-[10px_10px_1px_var(--primary-text)]/60 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-1 right-2 font-bold" onClick={onClose}>
          ✕
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}
