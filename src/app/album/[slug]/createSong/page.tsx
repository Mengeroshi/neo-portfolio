import { AddSongForm } from "@/components/Forms/AddSongForm";
import { PageModalWrapper } from "@/components/Modals/PageModalWrapper";
import { categoriesOptions } from "@/tanstack";
import { getQueryClient } from "@/utils/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function CreateSongPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(categoriesOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageModalWrapper closeButtonHref={`/album/${slug}`}>
        <AddSongForm />
      </PageModalWrapper>
    </HydrationBoundary>
  );
}
