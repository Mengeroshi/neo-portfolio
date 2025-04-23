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
          description: true,
          url: true,
        },
      },
      Songs: {
        orderBy: {
          id: "asc",
        },
        select: {
          id: true,
          typeContent: true,
          difficulty: true,
          ContentInfo: {
            select: {
              name: true,
              description: true,
              createdAt: true,
              imgUrl: true,
              url: true,
            },
          },
        },
      },
      Categories: {
        select: {
          id: true,
          name: true,
        },
      },
      Company: {
        select: {
          name: true,
        },
      },
    },
  });
};
