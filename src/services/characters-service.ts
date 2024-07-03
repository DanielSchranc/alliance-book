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
  next: string;
  previous: null | string;
  results: Character[];
};

// TODO: Replace url with environment variable
export const API_URL = "https://swapi.py4e.com/api/";

const http = httpClient(API_URL);

export async function getCharacters(searchParams?: URLSearchParams) {
  const res = await http.get<Characters>("/people/", { params: searchParams });
  return res.data;
}

export async function getCharacterDetails(id: string) {
  const res = await http.get<Character>(`/people/${id}`);
  return res.data;
}
