import http from "./httpService";

const apiEndpoint = "/outflowCategories";

export async function getCategories() {
  const { data: categories } = await http.get(apiEndpoint);

  return categories;
}
