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
  Theme,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import BackIcon from "@material-design-icons/svg/outlined/arrow_back.svg";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { Spinner } from "../components/Spinner";
import { PATHS } from "../router/Router";
import * as charactersService from "../services/characters-service";
import * as filmsService from "../services/films-service";
import { IMG_URL } from "../utils/constants";
import { trimIdFromUrl } from "../utils/url";

type CharacterUrlParams = {
  id: string;
};

export function CharacterDetailsPage() {
  const params = useParams<CharacterUrlParams>();

  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

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
    <>
      <Flex
        gap={5}
        align="center"
        justify="space-between"
        direction={{
          base: "column",
          md: "row",
        }}
        padding="1rem"
        borderRadius="1rem"
        position="sticky"
        top={20}
        zIndex={10}
        boxShadow="0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);"
        background={
          colorMode === "dark" ? theme.colors.gray[700] : theme.colors.gray[100]
        }
      >
        <Button as={Link} to={PATHS.home} leftIcon={<BackIcon />}>
          {"Back Home"}
        </Button>
      </Flex>
      <Card
        direction={{ base: "column", sm: "row" }}
        mt={5}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={`${IMG_URL}/characters/${params.id!}.jpg`}
          alt={data?.name}
        />

        <Stack>
          <CardBody>
            <Heading size="lg">{data?.name}</Heading>
            <List>
              {data &&
                Object.entries(data).map(([key, value], index) => {
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
                          <Text as="i">{`${value}`}</Text>
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
