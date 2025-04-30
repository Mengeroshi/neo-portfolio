import { Badge } from "@/components/Badges/Badge";
import { Button } from "@/components/Buttons/Button";
import { LabelWithUnderLine } from "@/components/Forms/LabelWithUnderline";
import { PixeledImg } from "@/components/Images/PixeledImg";
import { SongsTable } from "@/components/Tables/SongsTable";
import { IMGURLPLACEHOLDER } from "@/constants";
import { getAlbumBySlug, type TAlbumBySlug } from "@/server/queries/Album";
import { LaunchIcon } from "@sanity/icons";
import Link from "next/link";

type TAlbumContentInfo = Pick<TAlbumBySlug, "ContentInfo">["ContentInfo"];

type TAlbumDetails = Pick<TAlbumBySlug, "Categories" | "Company"> &
  Pick<TAlbumContentInfo, "createdAt">;

const Title = ({ name, url }: Pick<TAlbumContentInfo, "name" | "url">) => {
  return (
    <LabelWithUnderLine label="name" classNames={{ label: "border-t-0" }}>
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
  );
};

const Details = ({ Categories, Company, createdAt }: TAlbumDetails) => {
  return (
    <div className="mt-auto flex">
      <LabelWithUnderLine label="categories">
        <div className="flex gap-1">
          {Categories.length > 0 &&
            Categories.map((category) => (
              <Badge text={category.name} key={category.id} />
            ))}
        </div>
      </LabelWithUnderLine>
      {Company && (
        <LabelWithUnderLine label="company">
          <Badge text={Company.name} />
        </LabelWithUnderLine>
      )}
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
  );
};

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

  const { ContentInfo, Categories, Company } = album;
  const { name, imgUrl, description, url, createdAt } = ContentInfo;
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
        <div className="flex w-full flex-col text-blue-900">
          <Title name={name} url={url} />
          <LabelWithUnderLine label="description">
            <p className="max-h-[120px] overflow-scroll text-justify font-light tracking-wider">
              {description}
            </p>
          </LabelWithUnderLine>
          <Details
            Categories={Categories}
            Company={Company}
            createdAt={createdAt}
          />
        </div>
      </header>
      <SongsTable songs={album.Songs} />
      <Button
        className="!border-x-0 !border-t-0"
        variant="secondary"
        text="Add Song"
        fullWidth
        href={`/album/${slug}/createSong?companyId=${Company?.id}`}
      />
    </div>
  );
}
