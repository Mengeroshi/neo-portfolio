"use server";
import { createSongFormSchema } from "@/types/Song";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";
import { createSong } from "../mutations/Song";

export const onCreateSongAction = createServerAction()
  .input(createSongFormSchema)
  .handler(async ({ input }) => {
    const newSong = await createSong(input);
    revalidatePath("/album/" + input.albumSlug);

    return newSong;
  });
