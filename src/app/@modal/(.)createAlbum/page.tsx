import { CreateAlbumForm } from "@/components/Forms/CreateAlbumForm";
import { Modal } from "@/components/Modals/Modal";
import { CustomToaster } from "@/components/Toasters/CustomToaster";
import { categoriesOptions, companiesOptions } from "@/tanstack";
import { getQueryClient } from "@/utils/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function AddAlbumModalPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(companiesOptions);
  void queryClient.prefetchQuery(categoriesOptions);
  return (
    <Modal>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CreateAlbumForm />
      </HydrationBoundary>
      <CustomToaster />
    </Modal>
  );
}
