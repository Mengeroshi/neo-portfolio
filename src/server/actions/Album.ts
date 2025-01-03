"use server";
import { createAlbum } from "@/server/mutations/Album";
import { createAlbumFormSchema } from "@/types/Album";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";

export const onCreateAlbumAction = createServerAction()
  .input(createAlbumFormSchema)
  .handler(async ({ input }) => {
    const newAlbum = await createAlbum(input);

    revalidatePath("/");

    return newAlbum;
  });
