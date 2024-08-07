import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import BackIcon from "@material-design-icons/svg/outlined/arrow_back.svg";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { Spinner } from "../components/Spinner";
import { SubHeader } from "../components/SubHeader";
import { PATHS } from "../router/Router";
import * as charactersService from "../services/characters-service";
import * as filmsService from "../services/films-service";
import * as planetsService from "../services/planets-service";
import { IMG_URL } from "../utils/constants";
import { isValidUrl, trimIdFromUrl } from "../utils/url";

type CharacterUrlParams = {
  id: string;
};

export function CharacterDetailsPage() {
  const params = useParams<CharacterUrlParams>();

  const {
    data: character,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["ab-character", params.id],
    queryFn: async () => charactersService.getCharacterDetails(params.id!),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const { data: homeworld } = useQuery({
    queryKey: ["ab-planet", character?.url],
    queryFn: async () =>
      character && planetsService.getPlanet(trimIdFromUrl(character?.url)),
    enabled: () => character != null,
    retry: 0,
    refetchOnWindowFocus: false,
  });
  console.log({ homeworld });

  const films = useQueries({
    queries: character
      ? character.films
          .map((film) => trimIdFromUrl(film))
          .map((id) => ({
            queryKey: ["ab-film", id],
            queryFn: async () => filmsService.getFilm(id),
          }))
      : [],
  });

  if (isFetching || isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <SubHeader>
        <Button as={Link} to={PATHS.home} leftIcon={<BackIcon />}>
          {"Back Home"}
        </Button>
      </SubHeader>
      <Card
        direction={{ base: "column", sm: "row" }}
        mt={5}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "45%", md: "30%" }}
          src={`${IMG_URL}/characters/${params.id!}.jpg`}
          alt={character?.name}
        />

        <Stack>
          <CardBody>
            <Heading size="lg">{character?.name}</Heading>
            <List>
              {character &&
                Object.entries(character).map(([key, value], index) => {
                  const isString = typeof value === "string";
                  return (
                    isString && (
                      <ListItem key={index}>
                        <Flex>
                          <Text
                            as="b"
                            fontSize="lg"
                            mr={2}
                          >{`${key.split("_").join(" ")}:`}</Text>
                          {isValidUrl(value) && value.includes("planets") ? (
                            <Text as="i">{`${homeworld?.name}`}</Text>
                          ) : (
                            <Text as="i">{`${value}`}</Text>
                          )}
                        </Flex>
                      </ListItem>
                    )
                  );
                })}
            </List>
          </CardBody>
          <CardFooter></CardFooter>
        </Stack>
      </Card>
      <Card
        direction={{ base: "column", sm: "row" }}
        mt={5}
        overflow="hidden"
        variant="outline"
      >
        <CardBody>
          <Heading size="md">{"Films:"}</Heading>
          <List>
            {films.map((film, index) => (
              <ListItem key={`${film.data?.title}_${index}`}>{film.data?.title}</ListItem>
            ))}
          </List>
        </CardBody>
      </Card>
    </>
  );
}
