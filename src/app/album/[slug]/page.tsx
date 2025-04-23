import { Badge } from "@/components/Badges/Badge";
import { LabelWithUnderLine } from "@/components/Forms/LabelWithUnderline";
import { PixeledImg } from "@/components/Images/PixeledImg";
import { SongsTable } from "@/components/Tables/SongsTable";
import { IMGURLPLACEHOLDER } from "@/constants";
import { getAlbumBySlug } from "@/server/queries/Album";
import { LaunchIcon } from "@sanity/icons";
import Link from "next/link";

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
    ContentInfo: { imgUrl, name, description, url, createdAt },
    Categories,
    Company,
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
        <div className="flex w-full flex-col gap-1 p-4 text-blue-900">
          <LabelWithUnderLine label="name">
            {
              <h1 className="gap-2 text-4xl font-normal tracking-wide">
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
            <p className="max-h-[120px] overflow-scroll text-justify font-light tracking-wider">
              {description}
            </p>
          </LabelWithUnderLine>
          <div className="mt-auto flex gap-4">
            <LabelWithUnderLine label="categories">
              <div className="flex gap-1">
                {Categories.length > 0 &&
                  Categories.map((category) => (
                    <Badge
                      color={"red"}
                      text={category.name}
                      key={category.id}
                    />
                  ))}
              </div>
            </LabelWithUnderLine>
            <LabelWithUnderLine label="company">
              {Company && <Badge text={Company.name} />}
            </LabelWithUnderLine>
            <LabelWithUnderLine label=" creation date">
              <time
                className="mt-1 text-sm font-light leading-none tracking-wider text-blue-900"
                dateTime={createdAt.toISOString()}
              >
                {new Date().toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </LabelWithUnderLine>
          </div>
        </div>
      </header>
      <SongsTable songs={album.Songs} />
    </div>
  );
}
