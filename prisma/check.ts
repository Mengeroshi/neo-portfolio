import { db } from "../src/server/db";

async function main() {
  try {
    const platziAlbum = await db.album.findFirst({
      include: {
        ContentInfo: true,
        Categories: true,
        Company: true,
        Songs: {
          orderBy: {
            id: "asc",
          },
          include: {
            ContentInfo: true,
          },
        },
      },
    });

    const lel = await db.song.count();
    console.log("lel", lel);

    console.log("platziAlbum", platziAlbum?.Songs);
  } catch (error) {
    console.error(error);
  }
}

main().catch((e) => {
  console.error(e);
});
