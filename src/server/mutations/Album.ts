import { type TAddAlbumFormSchema } from "@/types/Album";
import { utapi } from "../uploadthing";
import { db } from "../db";

export const createAlbum = async (data: TAddAlbumFormSchema) => {
  const { image, slug, categories, company, ...contentInfo } = data;

  if (image !== null) {
    const utResponse = (await utapi.uploadFiles([image]))[0];

    if (utResponse?.error === null) {
      await db.album.create({
        data: {
          slug,
          ContentInfo: {
            create: {
              ...contentInfo,
              imgUrl: utResponse.data.url,
            },
          },
          Company: {
            connect: {
              id: company,
            },
          },
          Categories: {
            connect: categories.map((id) => ({ id })),
          },
        },
      });
    }
  }
};
