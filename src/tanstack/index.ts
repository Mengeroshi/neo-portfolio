import { type TCategories } from "@/server/queries/Category";
import { type TCompanies } from "@/server/queries/Company";
import { queryOptions } from "@tanstack/react-query";

export const companiesOptions = queryOptions({
  queryKey: ["companies"],
  queryFn: async () => {
    const response = await fetch("http://localhost:3000/api/company?query=all");
    const data = (await response.json()) as TCompanies;
    return data;
  },
});

export const categoriesOptions = queryOptions({
  queryKey: ["categories"],
  queryFn: async () => {
    const response = await fetch(
      "http://localhost:3000/api/category?query=all",
    );
    const data = (await response.json()) as TCategories;
    return data;
  },
});
