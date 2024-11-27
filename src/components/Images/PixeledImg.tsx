"use client";

import { Pixelit } from "@/PixelIt";
import Image from "next/image";
import { useEffect } from "react";

const IMGFROMSTRING = "pixelitImgFrom";
const CANVASTOSTRING = "pixelitCanvasTo";

export const PixeledImg = ({
  src,
  id,
  className,
  width,
  height,
  color,
  pixelNumber,
}: {
  src: string;
  className?: string;
  width?: number;
  height?: number;
  id?: string;
  color?: string;
  pixelNumber?: number;
}) => {
  let px: Pixelit;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    px = new Pixelit({
      from: id ? IMGFROMSTRING + id : undefined,
      to: id ? CANVASTOSTRING + id : undefined,
      scale: pixelNumber ?? 25,
    });

    px.draw().pixelate();
    px.convertPalette(color ? color : "#db3ede");
  }, []);

  return (
    <>
      <canvas
        className={className}
        width={width}
        height={height}
        id={id ? CANVASTOSTRING + id : "pixelitcanvas"}
      />
      <Image
        className="opacity-0"
        src={src}
        id={id ? IMGFROMSTRING + id : IMGFROMSTRING}
        alt=""
        width={width ?? 500}
        height={height ?? 500}
      />
    </>
  );
};
