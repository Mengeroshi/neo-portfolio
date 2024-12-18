import "server-only";
import { db } from "../db";

export const getCompanies = async () => {
  return await db.company.findMany({});
};

export type TCompanies = ReturnType<typeof getCompanies>;
