"use client";
import { TextInput } from "./TextInput";
import { Select } from "../Selects/Select";
import { Datepicker } from "../Datepickers/Datepicker";
import { useMemo, useRef } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { categoriesOptions } from "@/tanstack";
import { Button } from "../Buttons/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { ConfettiIcon, ErrorOutlineIcon } from "@sanity/icons";
import { createSongFormSchema, type TCreateSongFormSchema } from "@/types/Song";
import { onCreateSongAction } from "@/server/actions/Song";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ContentType, Difficulty } from "@prisma/client";
import { getErrorMessage, handleExecuteSubmit } from "@/utils/form";
import { Form } from "./Form";

const difficultyLevels = Object.values(Difficulty).map((difficulty) => ({
  name: difficulty,
  slug: difficulty,
}));
const typeContentOptions = Object.values(ContentType).map((contentType) => ({
  name: contentType,
  slug: contentType,
}));

export const AddSongForm = () => {
  const router = useRouter();
  const { slug } = useParams();
  const searchParam = useSearchParams();
  const companyId = searchParam.get("companyId");
  const { data: categories } = useSuspenseQuery(categoriesOptions);
  const formRef = useRef<HTMLFormElement>(null);

  const categoriesObj = useMemo(() => {
    return categories?.reduce(
      (acc: Record<number, (typeof categories)[0]>, category) => {
        acc[category.id] = category;
        return acc;
      },
      {},
    );
  }, [categories]);

  const { isPending, execute } = useServerAction(onCreateSongAction);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
    watch,
  } = useForm<TCreateSongFormSchema>({
    resolver: zodResolver(createSongFormSchema),
    defaultValues: {
      createdAt: new Date(),
      imgUrl: null,
      albumSlug: slug as string,
      companyId: companyId ? parseInt(companyId) : undefined,
    },
  });

  const [createdAt, categoriesSelected, difficulty, typeContent] = watch([
    "createdAt",
    "categories",
    "difficulty",
    "typeContent",
  ]);

  const difficultySelectedValue = useMemo(() => {
    const difficultyLevelsObj = difficultyLevels.find(
      (difficultyLevel) => difficultyLevel.name === difficulty,
    );

    return difficultyLevelsObj ? [difficultyLevelsObj] : [];
  }, [difficulty]);

  const categoriesSelectedValue = useMemo(() => {
    return Array.isArray(categoriesSelected)
      ? categoriesSelected
          .map((category: number) => categoriesObj[category])
          .filter(
            (category): category is NonNullable<typeof category> =>
              category !== undefined,
          )
      : [];
  }, [categoriesSelected, categoriesObj]);

  const typeContentSelectedValue = useMemo(() => {
    const option = typeContentOptions.find(
      (typeContentOption) => typeContentOption.name === typeContent,
    );
    return option ? [option] : [];
  }, [typeContent]);

  const execSubmit = handleSubmit(async (data) => {
    const [response, error] = await execute(data);

    handleExecuteSubmit<typeof createSongFormSchema, typeof response>(
      error,
      (message) => {
        toast.error(message, {
          icon: <ErrorOutlineIcon className="size-5" />,
        });
      },
      (name, error) => {
        setError(name as keyof TCreateSongFormSchema, error);
      },
      response,
      (response) => {
        toast.success(`Song "${response.name} created"`, {
          icon: <ConfettiIcon className="size-5" />,
        });
        reset();
        router.back();
      },
    );
  });

  return (
    <Form ref={formRef} onSubmit={execSubmit}>
      <>
        <h1 className="text-4xl text-blue-900">Create Song</h1>
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
        <TextInput
          label="url"
          {...register("url")}
          errorMessage={getErrorMessage(errors, "url")}
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
        <TextInput
          label="slug"
          {...register("slug")}
          required
          errorMessage={getErrorMessage(errors, "slug")}
        />
        <Select
          values={difficultySelectedValue}
          required
          label="difficulty"
          placeholder=""
          options={difficultyLevels}
          labelField="name"
          valueField="slug"
          onChange={(values) => {
            if (values[0]) {
              setValue("difficulty", values[0].name);
            }
          }}
          errorMessage={getErrorMessage(errors, "difficulty")}
        />
        <Select
          values={typeContentSelectedValue}
          required
          label="Content Type"
          placeholder=""
          options={typeContentOptions}
          labelField="name"
          valueField="slug"
          onChange={(values) => {
            if (values[0]) {
              setValue("typeContent", values[0].name);
            }
          }}
          errorMessage={getErrorMessage(errors, "difficulty")}
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

        <Button text="Submit" type="submit" fullWidth disabled={isPending} />
      </>
    </Form>
  );
};
