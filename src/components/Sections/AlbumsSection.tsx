import { getAlbumsCases } from "@/server/queries/Album";
import { AlbumCase } from "../Albums/AlbumCase";
import { AddAlbumTile } from "../Albums/AddAlbumTile";

export const AlbumsSection = async () => {
  const albums = await getAlbumsCases();
  return (
    <section className="flex flex-col">
      <h2 className="text-xl font-bold text-white">Albums</h2>
      <div className="flex flex-wrap gap-4">
        {albums.map(({ ContentInfo, slug }) => (
          <AlbumCase key={slug} slug={slug} {...ContentInfo} />
        ))}
        <AddAlbumTile />
      </div>
    </section>
  );
};
