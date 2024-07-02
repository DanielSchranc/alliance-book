import { Spinner as ChakraSpinner, Heading, Stack } from "@chakra-ui/react";

type SpinnerProps = {
  message?: string;
};

export function Spinner(props: SpinnerProps) {
  return (
    <Stack h="100vh" justifyContent="center" alignItems="center">
      <ChakraSpinner
        thickness="5px"
        speed="0.7s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      {props.message && (
        <Heading py={2} as="h4" size="md">
          {props.message}
        </Heading>
      )}
    </Stack>
  );
}
