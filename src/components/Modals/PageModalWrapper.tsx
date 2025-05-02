import { CloseIcon } from "@sanity/icons";
import Link from "next/link";

export const PageModalWrapper = ({
  children,
  closeButtonHref,
}: {
  children: React.ReactNode;
  closeButtonHref: string;
}) => {
  return (
    <main className="flex h-full max-h-screen min-h-screen items-center justify-center overflow-hidden">
      <section className="relative flex max-h-screen">
        <button className="absolute right-0 top-0 h-fit w-fit border border-r-0 border-t-0 border-blue-900 p-0.5">
          <Link className="size-full" href={closeButtonHref}>
            <CloseIcon className="size-7 text-[#3ECFDE]" />
          </Link>
        </button>
        {children}
      </section>
    </main>
  );
};
