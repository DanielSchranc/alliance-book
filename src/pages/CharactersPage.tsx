import {
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Theme,
  VStack,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { ImageCard } from "../components/ImageCard";
import { Pagination } from "../components/Pagination";
import { SearchInput } from "../components/SearchInput";
import { Select } from "../components/Select";
import { Spinner } from "../components/Spinner";
import * as charactersService from "../services/characters-service";
import { trimIdFromUrl } from "../utils/url";

export function CharactersPage() {
  const RESULTS_PER_PAGE = 10;

  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useSearchParams();

  const currentPage = Number(queryParams.get("page"));

  const [filter, setFilter] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(currentPage || 1);

  const { data, refetch, isFetching, isLoading } = useQuery({
    queryKey: ["ab-characters", search, page],
    queryFn: async () => charactersService.getCharacters(page, search),
    retry: 0,
    refetchOnWindowFocus: false,
  });
  console.log(data?.results);

  const handleSetPage = (value: number) => {
    setPage(value);
    setQueryParams({ page: `${value}` });
    refetch();
  };

  const _data =
    filter.length > 0
      ? data?.results.filter((item) => item.gender === filter)
      : data?.results;

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
        <SearchInput
          placeholder="Search character"
          onSearch={(value) => {
            setSearch(value);
            refetch();
          }}
        />
        <Select
          placeholder="Select gender"
          options={[...charactersService.genders]}
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        />
        {data && (
          <Pagination
            page={currentPage || page}
            total={Math.ceil(data?.count / RESULTS_PER_PAGE)}
            onSetPage={handleSetPage}
          />
        )}
      </Flex>

      {!isFetching && !isLoading && !data?.results.length && (
        <Center pt={20}>
          <VStack>
            <Heading size="md">{"No results found for your search"}</Heading>
          </VStack>
        </Center>
      )}

      {(isFetching || isLoading) && <Spinner message="Loading characters..." />}

      {_data != null && (
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={5}
          marginTop={5}
        >
          {_data.map((res) => {
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
      )}
    </>
  );
}
