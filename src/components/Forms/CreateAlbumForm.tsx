"use client";
import { TextInput } from "./TextInput";
import { Select } from "../Selects/Select";
import { Datepicker } from "../Datepickers/Datepicker";
import { UploadImgDropzone } from "../Images/UploadImgDropzone";
import { useRef } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { categoriesOptions, companiesOptions } from "@/tanstack";
import { Button } from "../Buttons/Button";
import {
  type FieldError,
  type FieldErrors,
  type FieldValues,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAlbumFormSchema,
  type TCreateAlbumFormSchema,
} from "@/types/Album";
import { onCreateAlbumAction } from "@/server/actions/Album";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { ConfettiIcon, ErrorOutlineIcon } from "@sanity/icons";

const getErrorMessage = (
  errors: FieldErrors<FieldValues>,
  fieldName: string,
) => {
  return typeof errors[fieldName]?.message === "string"
    ? (errors[fieldName] as FieldError).message
    : undefined;
};

export const CreateAlbumForm = () => {
  const { data: companies } = useSuspenseQuery(companiesOptions);
  const { data: categories } = useSuspenseQuery(categoriesOptions);
  const formRef = useRef<HTMLFormElement>(null);

  const { isPending, execute } = useServerAction(onCreateAlbumAction);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
    watch,
  } = useForm<TCreateAlbumFormSchema>({
    resolver: zodResolver(createAlbumFormSchema),
    defaultValues: {
      createdAt: new Date(),
      image: null,
    },
  });

  const [createdAt, image] = watch(["createdAt", "image"]);

  return (
    <form
      ref={formRef}
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit(async (data) => {
          const [response, error] = await execute(data);
          if (error) {
            toast.error(error.message, {
              icon: <ErrorOutlineIcon className="size-5" />,
            });

            if (error.name === "ZodError") {
              Object.entries(error.fieldErrors ?? {}).forEach(
                ([key, value]) => {
                  setError(key as keyof TCreateAlbumFormSchema, {
                    type: "manual",
                    message: value[0],
                  });
                },
              );
            }
          } else {
            toast.success(`Album "${response.name} created"`, {
              icon: <ConfettiIcon className="size-5" />,
            });
            reset();
          }
        })(e);
      }}
      style={{ scrollbarGutter: "stable !important" }}
      className="scrollbar-thumb-rounded-none flex w-[50vw] flex-col gap-4 overflow-auto scrollbar scrollbar-track-blue-200/[.40] scrollbar-thumb-blue-900/[.40]"
    >
      <TextInput
        required
        label="name"
        {...register("name")}
        errorMessage={getErrorMessage(errors, "name")}
      />
      <TextInput
        required
        isTextArea
        label="description"
        {...register("description")}
        errorMessage={getErrorMessage(errors, "description")}
      />
      <UploadImgDropzone
        required
        config={{
          image: {
            maxFileSize: "1MB",
            maxFileCount: 1,
            minFileCount: 1,
            contentDisposition: "inline",
          },
        }}
        files={image ? [image] : []}
        onDropSuccess={(files) => {
          if (files[0]) {
            setValue("image", files[0]);
          }
        }}
        onDelete={() => {
          setValue("image", null);
        }}
        errorMessage={getErrorMessage(errors, "image")}
      />

      <TextInput
        label="slug"
        {...register("slug")}
        required
        errorMessage={getErrorMessage(errors, "slug")}
      />
      <TextInput
        label="url"
        {...register("url")}
        errorMessage={getErrorMessage(errors, "url")}
      />
      <Select
        required
        label="company"
        placeholder=""
        options={companies}
        labelField="name"
        valueField="id"
        onChange={(values) => {
          if (values[0]) {
            setValue("company", values[0].id);
          }
        }}
        errorMessage={getErrorMessage(errors, "company")}
      />
      <Select
        required
        label="categories"
        placeholder=""
        isMulti
        options={categories}
        labelField="name"
        valueField="id"
        onChange={(values) => {
          setValue(
            "categories",
            values.map((v) => v.id),
          );
        }}
        errorMessage={getErrorMessage(errors, "categories")}
      />
      <Datepicker
        date={createdAt}
        label="created At"
        required
        onChange={(date) => {
          setValue("createdAt", date);
        }}
        errorMessage={getErrorMessage(errors, "createdAt")}
      />
      <Button text="Submit" type="submit" fullWidth disabled={isPending} />
    </form>
  );
};
