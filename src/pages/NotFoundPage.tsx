import { Button, Center, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PATHS } from "../router/Router";

export function NotFoundPage() {
  return (
    <Center padding={5}>
      <VStack>
        <Heading>404 Page not found</Heading>
        <Button as={Link} to={PATHS.home}>
          {"Back Home"}
        </Button>
      </VStack>
    </Center>
  );
}
