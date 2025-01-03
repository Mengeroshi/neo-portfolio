import { z } from "zod";
const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createAlbumFormSchema = z
  .object({
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    slug: z.string({
      required_error: "Slug is required",
    }),
    url: z
      .string()
      .url({
        message: "Invalid URL",
      })
      .optional()
      .or(z.literal("")),
    image: z
      .custom<File | null>((image) => image instanceof File, {
        message: "Image is required",
      })
      .refine(
        (file) => file && file.size <= MAX_FILE_SIZE,
        `Max image size is 1MB.`,
      )
      .refine(
        (file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
      ),

    company: z.number({
      required_error: "Company is required",
    }),
    categories: z.array(z.number(), {
      required_error: "Categories are required",
    }),
    createdAt: z.date({
      required_error: "Date of creation is required",
    }),
  })
  .refine(({ image }) => image instanceof File, {
    message: "Image is required",
    path: ["image"],
  });
export type TCreateAlbumFormSchema = z.infer<typeof createAlbumFormSchema>;
