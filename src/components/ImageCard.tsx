import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";

type ImageCardProps = {
  src: string;
  alt: string;
  title: string;
  onClick: () => void;
};

export function ImageCard(props: React.PropsWithChildren<ImageCardProps>) {
  return (
    <Card maxW="fit-content" borderRadius="lg">
      <CardBody>
        <Image
          src={props.src}
          alt={props.alt}
          objectFit="cover"
          maxW="100%"
          height="auto"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{props.title}</Heading>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button variant="solid" colorScheme="blue" w="100%" onClick={props.onClick}>
          {"More details"}
        </Button>
      </CardFooter>
    </Card>
  );
}
