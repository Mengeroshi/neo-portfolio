import { CreateAlbumForm } from "@/components/Forms/CreateAlbumForm";
import { PageModalWrapper } from "@/components/Modals/PageModalWrapper";
import { categoriesOptions, companiesOptions } from "@/tanstack";
import { getQueryClient } from "@/utils/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default function CreateAlbumPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(companiesOptions);
  void queryClient.prefetchQuery(categoriesOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageModalWrapper closeButtonHref="/">
        <CreateAlbumForm />
      </PageModalWrapper>
    </HydrationBoundary>
  );
}
