import http from "./httpService";

const apiEndpoint = "/outflows";

export async function getOutflows() {
  const { data: categories } = await http.get(apiEndpoint);

  return categories;
}
