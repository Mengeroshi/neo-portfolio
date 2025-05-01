import { AddSongForm } from "@/components/Forms/AddSongForm";
import { Modal } from "@/components/Modals/Modal";
import { CustomToaster } from "@/components/Toasters/CustomToaster";
import { categoriesOptions } from "@/tanstack";
import { getQueryClient } from "@/utils/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function AddSongModalPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(categoriesOptions);
  return (
    <Modal>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AddSongForm />
      </HydrationBoundary>
      <CustomToaster />
    </Modal>
  );
}
