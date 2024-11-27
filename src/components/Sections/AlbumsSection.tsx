import { getAlbumsCases } from "@/server/queries/Album";
import { AlbumCase } from "../Albums/AlbumCase";

export const AlbumsSection = async () => {
  const albums = await getAlbumsCases();
  return (
    <section className="flex flex-col">
      <h2 className="text-xl font-bold text-white">Albums</h2>
      <div>
        {albums.map((album) => (
          <AlbumCase key={album.id} {...album.ContentInfo} />
        ))}
      </div>
    </section>
  );
};
