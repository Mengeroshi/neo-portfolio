import "server-only";

import { db } from "../db";

export const getAlbumsCases = async () => {
  return await db.album.findMany({
    select: {
      id: true,
      slug: true,
      ContentInfo: {
        select: {
          name: true,
          createdAt: true,
          imgUrl: true,
        },
      },
    },
  });
};

export const getAlbumBySlug = async (slug: string) => {
  return await db.album.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      ContentInfo: {
        select: {
          name: true,
          createdAt: true,
          imgUrl: true,
        },
      },
      Songs: {
        select: {
          id: true,
          ContentInfo: {
            select: {
              name: true,
              description: true,
              createdAt: true,
              imgUrl: true,
            },
          },
        },
      },
    },
  });
};
