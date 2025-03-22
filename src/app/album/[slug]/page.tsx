import { PixeledImg } from "@/components/Images/PixeledImg";
import { SongsTable } from "@/components/Tables/SongsTable";
import { IMGURLPLACEHOLDER } from "@/constants";
import { getAlbumBySlug } from "@/server/queries/Album";
import { LaunchIcon } from "@sanity/icons";
import Link from "next/link";

const LabelWithUnderLine = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <div className="border-b border-blue-900/40 text-sm leading-none tracking-widest text-blue-900/40">
        {label}
      </div>
      {children}
    </div>
  );
};

export type TTSongTable = Pick<
  NonNullable<Awaited<ReturnType<typeof getAlbumBySlug>>>,
  "Songs"
>["Songs"];

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const album = await getAlbumBySlug(slug);

  if (album === null) {
    return <div>album {slug} not found</div>;
  }

  const {
    ContentInfo: { imgUrl, name, description, url },
  } = album;

  return (
    <div>
      <header className="flex">
        <PixeledImg
          id={name}
          src={imgUrl ?? IMGURLPLACEHOLDER}
          color={"#3ECFDE"}
          pixelNumber={45}
          width={300}
          height={300}
          className="h-[300px] w-[300px] border-r border-blue-900/60"
        />
        <div className="flex flex-col gap-1 p-4 text-blue-900">
          <LabelWithUnderLine label="name">
            {
              <h1 className="text-4xl font-normal tracking-wide">
                {url ? (
                  <Link
                    className="group flex hover:underline"
                    href={url}
                    target="_blank"
                  >
                    {name}
                    <LaunchIcon className="hidden group-hover:block" />
                  </Link>
                ) : (
                  name
                )}
              </h1>
            }
          </LabelWithUnderLine>
          <LabelWithUnderLine label="description">
            <p className="text-justify font-light tracking-wider">
              {description}
            </p>
          </LabelWithUnderLine>
        </div>
      </header>
      <SongsTable songs={album.Songs} />
    </div>
  );
}
