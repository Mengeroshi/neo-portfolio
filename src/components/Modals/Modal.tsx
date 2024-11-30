"use client";

import { CloseIcon } from "@sanity/icons";
import { useRouter } from "next/navigation";
import React, { type ElementRef, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export const Modal = ({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
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
      className="z-100 absolute bottom-0 left-0 right-0 top-0"
      onClose={onDismiss}
      onClick={onDismiss}
    >
      <article
        className="relative border border-[#3ECFDE] bg-black p-8"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
        <button
          onClick={onDismiss}
          className="absolute right-0 top-0 h-fit w-fit p-0.5"
        >
          <CloseIcon className="size-7 text-[#3ECFDE]" />
        </button>
      </article>
    </dialog>,

    document.getElementById("modal-root")!,
  );
};
