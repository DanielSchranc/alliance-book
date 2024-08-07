import { API_URL } from "../utils/constants";
import { httpClient } from "../utils/http";

export const genders = ["male", "female", "none", "n/a"] as const;

export type Gender = (typeof genders)[number];
export type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: Gender;
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

const http = httpClient(API_URL);

export async function getCharacters(page?: number, search?: string) {
  const params = new URLSearchParams();

  if (search != null && search.length > 0) {
    params.append("search", search);
  }

  if (page != null && page !== 0 && !search?.length) {
    params.append("page", `${page}`);
  }

  const res = await http.get<Characters>("/people/", { params });
  return res.data;
}

export async function getCharacterDetails(id: string) {
  const res = await http.get<Character>(`/people/${id}`);
  return res.data;
}
