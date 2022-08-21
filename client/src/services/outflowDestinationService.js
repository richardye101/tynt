import http from "./httpService";

const apiEndpoint = "/outflowDestinations";

export async function getDestinations() {
  const { data: destinations } = await http.get(apiEndpoint);

  return destinations;
}
