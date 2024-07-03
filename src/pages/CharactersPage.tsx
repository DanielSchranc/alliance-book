import { Flex, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { ImageCard } from "../components/ImageCard";
import { Pagination } from "../components/Pagination";
import { SearchInput } from "../components/SearchInput";
import { Spinner } from "../components/Spinner";
import * as charactersService from "../services/characters-service";

export function CharactersPage() {
  const RESULTS_PER_PAGE = 10;
  const breakpoints = useBreakpointValue({
    base: "repeat(2, 1fr)",
    md: "repeat(5, 1fr)",
  });

  const navigate = useNavigate();

  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);

  const { data, refetch, isFetching, isLoading } = useQuery({
    queryKey: ["ab-characters", search, page],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (search.length) {
        params.append("search", search);
      }

      params.append("page", `${page}`);

      return charactersService.getCharacters(params);
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const trimIdFromUrl = (url: string) => {
    const parts = url.split("/").filter((part) => part !== "");
    const [id] = parts.slice(-1);

    return id;
  };

  return (
    <>
      <Flex justify="space-between">
        <SearchInput
          placeholder="Search character"
          onSearch={(value) => {
            setSearch(value);
            refetch();
          }}
        />
        {data && (
          <Pagination
            page={page}
            total={Math.ceil(data?.count / RESULTS_PER_PAGE)}
            onSetPage={(value) => {
              setPage(value);
              refetch();
            }}
          />
        )}
      </Flex>

      {isFetching || isLoading ? (
        <Spinner message="Loading characters..." />
      ) : (
        <Grid templateColumns={breakpoints} gap={5} marginTop={5}>
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
      )}
    </>
  );
}
