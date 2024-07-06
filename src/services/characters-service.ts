import { httpClient } from "src/utils/http";

export type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};
export type Characters = {
  count: number;
  next: null | string;
  previous: null | string;
  results: Character[];
};

// TODO: Replace url with environment variable
export const API_URL = "https://swapi.py4e.com/api/";

const http = httpClient(API_URL);

export async function getCharacters(page?: number, search?: string) {
  const params = new URLSearchParams();

  if (search != null && search.length > 0) {
    params.append("search", search);
  }

  if (page != null && page !== 0) {
    params.append("page", `${page}`);
  }

  const res = await http.get<Characters>("/people/", { params });
  return res.data;
}

export async function getCharacterDetails(id: string) {
  const res = await http.get<Character>(`/people/${id}`);
  return res.data;
}
