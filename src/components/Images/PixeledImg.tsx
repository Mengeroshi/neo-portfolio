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
  useEffect(() => {
    const init = async () => {
      const px = new Pixelit({
        from: id ? IMGFROMSTRING + id : undefined,
        to: id ? CANVASTOSTRING + id : undefined,
        scale: pixelNumber ?? 25,
      });

      try {
        await px.draw();
        await px.pixelate();
        px.convertPalette(color ? color : "#db3ede");
      } catch (error) {
        console.error("Error processing image:", error);
      }
    };

    init().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
