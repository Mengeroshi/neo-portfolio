import { ContentType, Difficulty } from "@prisma/client";
import { z } from "zod";

export const createSongFormSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  url: z
    .string()
    .url({
      message: "Invalid URL",
    })
    .optional()
    .or(z.literal("")),
  createdAt: z.date({
    required_error: "Date of creation is required",
  }),
  imgUrl: z.nullable(z.string()).default(null),

  slug: z.string({
    required_error: "Slug is required",
  }),

  typeContent: z.nativeEnum(ContentType, {
    required_error: "Content type is required",
  }),
  difficulty: z.nativeEnum(Difficulty, {
    required_error: "Difficulty type is required",
  }),
  companyId: z.number({
    required_error: "Company is required",
  }),
  categories: z.array(z.number(), {
    required_error: "Categories are required",
  }),
  albumSlug: z.string({ required_error: "Album Slug required" }),
});
export type TCreateSongFormSchema = z.infer<typeof createSongFormSchema>;
