import { IMGURLPLACEHOLDER } from "@/constants";
import { PixeledImg } from "../Images/PixeledImg";
import Link from "next/link";

export const AlbumCase = ({
  imgUrl,
  name,
  createdAt,
  slug,
}: {
  imgUrl: string | null;
  name: string;
  createdAt: Date;
  slug: string;
}) => {
  const year = new Date(createdAt).getFullYear();

  return (
    <figure className="max-w-[215px] text-white">
      <Link href={`album/${slug}`}>
        <PixeledImg
          id={name}
          src={imgUrl ?? IMGURLPLACEHOLDER}
          color={"#3ECFDE"}
          pixelNumber={45}
          width={215}
          height={215}
          className="h-[215px] w-[215px]"
        />
      </Link>

      <figcaption className="mt-1 text-xl leading-none text-[#3ECFDE]">
        {name}
      </figcaption>
      <time className="text-lg leading-none" dateTime="YYYY">
        {year}
      </time>
    </figure>
  );
};
