import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { ImageCard } from "../components/ImageCard";
import { Spinner } from "../components/Spinner";
import * as charactersService from "../services/characters-service";

export function CharactersPage() {
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
    </>
  );
}
