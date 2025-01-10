import { CreateAlbumForm } from "@/components/Forms/CreateAlbumForm";
import { categoriesOptions, companiesOptions } from "@/tanstack";
import { getQueryClient } from "@/utils/react-query";
import { CloseIcon } from "@sanity/icons";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";

export default function CreateAlbumPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(companiesOptions);
  void queryClient.prefetchQuery(categoriesOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex h-full max-h-screen min-h-screen items-center justify-center overflow-hidden">
        <section className="relative flex max-h-screen">
          <button className="absolute right-0 top-0 h-fit w-fit border border-r-0 border-t-0 border-blue-900 p-0.5">
            <Link className="size-full" href="/">
              <CloseIcon className="size-7 text-[#3ECFDE]" />
            </Link>
          </button>
          <CreateAlbumForm />
        </section>
      </main>
    </HydrationBoundary>
  );
}
