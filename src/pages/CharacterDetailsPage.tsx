import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { Spinner } from "../components/Spinner";
import * as charactersService from "../services/characters-service";

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

  if (isFetching || isLoading) {
    return <Spinner />;
  }

  return <Box>{data?.name}</Box>;
}
