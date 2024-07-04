import { Box, Button, Center, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { Spinner } from "../components/Spinner";
import { PATHS } from "../router/Router";
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

  return (
    <Center>
      <VStack>
        <Box>{data?.name}</Box>
        <Box mt={30}>
          <Button as={Link} to={PATHS.home}>
            {"Back Home"}
          </Button>
        </Box>
      </VStack>
    </Center>
  );
}
