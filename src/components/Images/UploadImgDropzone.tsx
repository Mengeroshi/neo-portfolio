"use client";
import { useDropzone } from "@uploadthing/react";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import { useCallback } from "react";
import Image from "next/image";
import { Label } from "../Forms/Label";
import { CloseIcon, UploadIcon } from "@sanity/icons";
import { type ExpandedRouteConfig } from "uploadthing/types";

export const UploadImgDropzone = ({
  files,
  config,
  onDropSuccess,
  onDelete,
}: {
  files: File[];
  config?: ExpandedRouteConfig;
  onDropSuccess: (acceptedFiles: File[]) => void;
  onDelete: () => void;
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onDropSuccess(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(config).fileTypes,
    ),
  });

  return (
    <Label name="image">
      <div className="flex w-full items-center justify-center border border-blue-900 bg-blue-200 text-blue-900">
        {files.length > 0 ? (
          <div className="relative">
            <Image
              className=""
              width={200}
              height={200}
              src={URL.createObjectURL(files[0] as Blob)}
              alt="preview"
            />
            <CloseIcon
              role="button"
              className="absolute right-0 top-0 size-7"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete();
              }}
            />
          </div>
        ) : (
          <div className="" {...getRootProps()}>
            <div className="flex flex-col items-center justify-center py-4">
              <input {...getInputProps()} />
              <UploadIcon className="size-7" />
              <p>Drag n drop or click to select file</p>
            </div>
          </div>
        )}
      </div>
    </Label>
  );
};
