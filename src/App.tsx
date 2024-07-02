import {
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Link,
  Spinner,
  Theme,
  useBreakpointValue,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import DarkModeIcon from "@material-design-icons/svg/outlined/dark_mode.svg";
import LightModeIcon from "@material-design-icons/svg/outlined/light_mode.svg";
import { useQuery } from "@tanstack/react-query";

import * as charactersService from "./services/characters-service";

export function App() {
  const theme = useTheme<Theme>();

  const { colorMode, toggleColorMode } = useColorMode();

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
    <Spinner />;
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
        <Grid
          templateColumns={useBreakpointValue({
            base: "repeat(2, 1fr)",
            md: "repeat(5, 1fr)",
          })}
          gap={5}
        >
          {data?.results.map((res) => {
            return (
              <GridItem w="100%" h="100%" key={res.created}>
                <Image
                  src={`https://starwars-visualguide.com/assets/img/characters/${trimIdFromUrl(res.url)}.jpg`}
                  alt={res.name}
                  objectFit="cover"
                />
              </GridItem>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
