import { API_URL } from "../utils/constants";
import { httpClient } from "../utils/http";

export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: "George Lucas" | "Irvin Kershner" | "Richard Marquand" | "J. J. Abrams";
  producer:
    | "George Lucas"
    | "Gary Kurtz"
    | "Rick McCallum"
    | "Howard G. Kazanjian"
    | "Kathleen Kennedy"
    | "Bryan Burk"
    | "J. J. Abrams";
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};

const http = httpClient(API_URL);

export async function getFilm(id: string) {
  const res = await http.get<Film>(`/films/${id}`);
  return res.data;
}
