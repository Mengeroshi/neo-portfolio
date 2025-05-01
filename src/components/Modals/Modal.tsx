"use client";

import { CloseIcon } from "@sanity/icons";
import { useRouter } from "next/navigation";
import React, { type ElementRef, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  function onDismiss() {
    router.back();
  }

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }

    document.body.classList.add("blur-[8px]");

    return () => {
      document.body.classList.remove("blur-[8px]");
    };
  }, []);

  return ReactDOM.createPortal(
    <dialog
      ref={dialogRef}
      className="absolute bottom-0 left-0 right-0 top-0 z-10 max-h-screen overflow-hidden bg-[#04070F]"
      onClose={onDismiss}
      onClick={onDismiss}
    >
      <article
        className="relative flex max-h-screen flex-col"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}

        <button
          onClick={onDismiss}
          className="absolute right-0 top-0 h-fit w-fit border border-blue-900 p-0.5"
        >
          <CloseIcon className="size-7 text-[#3ECFDE]" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 -z-[1] aspect-square h-[55vh] w-full border bg-[#3ECFDE]/20 opacity-30 blur-[300px]" />
      </article>
    </dialog>,

    document.getElementById("modal-root")!,
  );
};
