import {
  Box,
  Button,
  Center,
  Heading,
  ListItem,
  OrderedList,
  VStack,
} from "@chakra-ui/react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { Spinner } from "../components/Spinner";
import { PATHS } from "../router/Router";
import * as charactersService from "../services/characters-service";
import * as filmsService from "../services/films-service";
import { trimIdFromUrl } from "../utils/url";

type CharacterUrlParams = {
  id: string;
};

export function CharacterDetailsPage() {
  const params = useParams<CharacterUrlParams>();

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["ab-character", params.id],
    queryFn: async () => charactersService.getCharacterDetails(params.id!),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const films = useQueries({
    queries: data
      ? data.films
          .map((film) => trimIdFromUrl(film))
          .map((id) => ({
            queryKey: ["film", id],
            queryFn: async () => filmsService.getFilm(id),
          }))
      : [],
  });

  if (isFetching || isLoading) {
    return <Spinner />;
  }

  return (
    <Center>
      <VStack>
        <Heading size="lg">{data?.name}</Heading>
        <Box>
          <OrderedList>
            {films.map((film) => (
              <ListItem key={film.data?.created}>{film.data?.title}</ListItem>
            ))}
          </OrderedList>
        </Box>
        <Box mt={30}>
          <Button as={Link} to={PATHS.home}>
            {"Back Home"}
          </Button>
        </Box>
      </VStack>
    </Center>
  );
}
