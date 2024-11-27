import "server-only";

import { db } from "../db";

export const getAlbumsCases = async () => {
  return await db.album.findMany({
    select: {
      id: true,
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
