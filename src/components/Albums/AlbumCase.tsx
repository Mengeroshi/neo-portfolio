import { IMGURLPLACEHOLDER } from "@/constants";
import { PixeledImg } from "../Images/PixeledImg";

export const AlbumCase = ({
  imgUrl,
  name,
  createdAt,
}: {
  imgUrl: string | null;
  name: string;
  createdAt: Date;
}) => {
  const year = new Date(createdAt).getFullYear();

  return (
    <figure className="max-w-[215px] text-white">
      <PixeledImg
        id={name}
        src={imgUrl ?? IMGURLPLACEHOLDER}
        color={"#3ECFDE"}
        pixelNumber={45}
        width={215}
        height={215}
        className="!w-full"
      />

      <figcaption className="mt-1 text-xl leading-none text-[#3ECFDE]">
        {name}
      </figcaption>
      <time className="text-lg leading-none" dateTime="YYYY">
        {year}
      </time>
    </figure>
  );
};
