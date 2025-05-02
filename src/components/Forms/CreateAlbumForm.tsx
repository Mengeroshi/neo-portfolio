"use client";
import { TextInput } from "./TextInput";
import { Select } from "../Selects/Select";
import { Datepicker } from "../Datepickers/Datepicker";
import { UploadImgDropzone } from "../Images/UploadImgDropzone";
import { useMemo, useRef } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { categoriesOptions, companiesOptions } from "@/tanstack";
import { Button } from "../Buttons/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAlbumFormSchema,
  type TCreateAlbumFormSchema,
} from "@/types/Album";
import { onCreateAlbumAction } from "@/server/actions/Album";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { ConfettiIcon, ErrorOutlineIcon } from "@sanity/icons";
import { getErrorMessage, handleExecuteSubmit } from "@/utils/form";
import { Form } from "./Form";
import { useRouter } from "next/navigation";

export const CreateAlbumForm = () => {
  const router = useRouter();
  const { data: companies } = useSuspenseQuery(companiesOptions);
  const { data: categories } = useSuspenseQuery(categoriesOptions);
  const formRef = useRef<HTMLFormElement>(null);

  const companiesObj = useMemo(() => {
    return companies?.reduce(
      (acc: Record<number, (typeof companies)[0]>, company) => {
        acc[company.id] = company;
        return acc;
      },
      {},
    );
  }, [companies]);

  const categoriesObj = useMemo(() => {
    return categories?.reduce(
      (acc: Record<number, (typeof categories)[0]>, category) => {
        acc[category.id] = category;
        return acc;
      },
      {},
    );
  }, [categories]);

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

  const [createdAt, image, company, categoriesSelected] = watch([
    "createdAt",
    "image",
    "company",
    "categories",
  ]);

  const companySelectedValue = useMemo(() => {
    return companiesObj[company] ? [companiesObj[company]] : [];
  }, [company, companiesObj]);

  const categoriesSelectedValue = useMemo(() => {
    return categoriesSelected
      ? categoriesSelected
          .map((category) => categoriesObj[category])
          .filter(
            (category): category is NonNullable<typeof category> =>
              category !== undefined,
          )
      : [];
  }, [categoriesSelected, categoriesObj]);

  const executeSubmit = handleSubmit(async (data) => {
    const [response, error] = await execute(data);

    handleExecuteSubmit<typeof createAlbumFormSchema, typeof response>(
      error,
      (message) => {
        toast.error(message, {
          icon: <ErrorOutlineIcon className="size-5" />,
        });
      },
      (name, error) => {
        setError(name as keyof TCreateAlbumFormSchema, error);
      },
      response,
      (response) => {
        toast.success(`Album "${response.name} created"`, {
          icon: <ConfettiIcon className="size-5" />,
        });
        reset();
        router.back();
      },
    );
  });

  return (
    <Form ref={formRef} onSubmit={executeSubmit}>
      <h1 className="text-4xl text-blue-900">Create Album</h1>
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
        values={companySelectedValue}
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
        values={categoriesSelectedValue}
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
    </Form>
  );
};
