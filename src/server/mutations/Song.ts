"use server";
import {
  type TDeleteSongSchema,
  type TCreateSongFormSchema,
} from "@/types/Song";
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

export const deleteSongById = async (id: TDeleteSongSchema) => {
  const song = await db.song.findUnique({ where: { id } });

  const deleteContentInfo = db.contentInfo.delete({
    where: {
      id: song?.contentInfoId,
    },
  });

  const deleteSong = db.song.delete({
    where: {
      id,
    },
  });

  return await db.$transaction([deleteSong, deleteContentInfo]);
};
