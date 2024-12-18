import { getCategories } from "@/server/queries/Category";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  if (query === "all") {
    const companies = await getCategories();
    return new Response(JSON.stringify(companies), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: "Invalid query parameter" }), {
    headers: { "Content-Type": "application/json" },
    status: 400,
  });
}
