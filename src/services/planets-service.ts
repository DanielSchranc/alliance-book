import { API_URL } from "../utils/constants";
import { httpClient } from "../utils/http";

export type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

const http = httpClient(API_URL);

export async function getPlanet(id: string) {
  const res = await http.get<Planet>(`/planets/${id}`);
  return res.data;
}
