import {
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Link,
  Theme,
  useBreakpointValue,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import DarkModeIcon from "@material-design-icons/svg/outlined/dark_mode.svg";
import LightModeIcon from "@material-design-icons/svg/outlined/light_mode.svg";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { ImageCard } from "../components/ImageCard";
import { Spinner } from "../components/Spinner";
import * as charactersService from "../services/characters-service";

export function CharactersPage() {
  const theme = useTheme<Theme>();
  const { colorMode, toggleColorMode } = useColorMode();
  const breakpoints = useBreakpointValue({
    base: "repeat(2, 1fr)",
    md: "repeat(5, 1fr)",
  });

  const navigate = useNavigate();

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["ab-characters"],
    queryFn: async () => charactersService.getCharacters(),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const trimIdFromUrl = (url: string) => {
    const parts = url.split("/").filter((part) => part !== "");
    const [id] = parts.slice(-1);

    return id;
  };

  if (isFetching || isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Flex
        as="header"
        padding="1em 2em"
        alignItems="flex-end"
        borderBottom="1px solid"
        borderColor={
          colorMode === "dark" ? theme.colors.whiteAlpha[300] : theme.colors.gray[100]
        }
        justify="space-between"
      >
        <Link as="a" href="/" _hover={{ textDecoration: "none" }}>
          <Heading as="h1" size="lg">
            {"Alliance Book"}
          </Heading>
        </Link>
        <IconButton
          onClick={toggleColorMode}
          title="Change color mode"
          aria-label="Change color mode"
          isRound={true}
          variant="ghost"
          icon={colorMode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        />
      </Flex>
      <Container maxW="max-content" padding="2em">
        <Grid templateColumns={breakpoints} gap={5}>
          {data?.results.map((res) => {
            const characterId = trimIdFromUrl(res.url);
            return (
              <GridItem w="100%" h="100%" key={res.created}>
                <ImageCard
                  src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
                  alt={res.name}
                  title={res.name}
                  onClick={() => {
                    navigate(`/character/${characterId}`);
                  }}
                />
              </GridItem>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
