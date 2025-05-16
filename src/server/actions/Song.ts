"use server";
import { createSongFormSchema, deleteSongSchema } from "@/types/Song";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";
import { createSong, deleteSongById } from "../mutations/Song";
import { z } from "zod";

export const onCreateSongAction = createServerAction()
  .input(createSongFormSchema)
  .handler(async ({ input }) => {
    const newSong = await createSong(input);
    revalidatePath("/album/" + input.albumSlug);

    return newSong;
  });

export const onDeleteSongByIdAction = createServerAction()
  .input(
    z.object({
      id: deleteSongSchema,
      albumSlug: z.string({
        required_error: "Album Slug is required",
      }),
    }),
  )
  .handler(async ({ input: { id, albumSlug } }) => {
    const song = await deleteSongById(id);
    revalidatePath("/album/" + albumSlug);
    return song;
  });
