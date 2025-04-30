"use server";
import { type TCreateSongFormSchema } from "@/types/Song";
import { db } from "../db";

export const createSong = async (data: TCreateSongFormSchema) => {
  const {
    slug,
    typeContent,
    difficulty,
    albumSlug,
    companyId,
    categories,
    ...contentInfo
  } = data;

  const song = await db.song.create({
    data: {
      slug,
      typeContent,
      difficulty,
      ContentInfo: {
        create: {
          ...contentInfo,
        },
      },
      Album: {
        connect: {
          slug: albumSlug,
        },
      },
      Categories: {
        connect: categories.map((id) => ({ id })),
      },
      Company: {
        connect: {
          id: companyId,
        },
      },
    },
  });
  return { ...song, name: contentInfo.name };
};
