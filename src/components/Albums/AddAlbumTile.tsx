import { AddIcon } from "@sanity/icons";
import Link from "next/link";

export const AddAlbumTile = () => {
  return (
    <article className="">
      <Link href={"/addAlbum"}>
        <button className="flex size-[215px] items-center justify-center bg-[#0a141e]">
          <AddIcon className="size-[100px] text-[#3ECFDE] [&>*]:stroke-[0.3]" />
        </button>
      </Link>
    </article>
  );
};
