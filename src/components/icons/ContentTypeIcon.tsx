import { type ContentType } from "@prisma/client";
import { CodeIcon, DocumentTextIcon, DocumentVideoIcon } from "@sanity/icons";

export const ContentTypeIcon = ({
  ContentType,
  className,
}: {
  ContentType: ContentType;
  className?: string;
}) => {
  if (ContentType === "CODE") {
    return <CodeIcon className={className} />;
  }
  if (ContentType === "VIDEO") {
    return <DocumentVideoIcon className={className} />;
  }

  return <DocumentTextIcon className={className} />;
};
