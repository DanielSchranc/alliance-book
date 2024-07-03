import {
  Container,
  Flex,
  Heading,
  IconButton,
  Link,
  Theme,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import DarkModeIcon from "@material-design-icons/svg/outlined/dark_mode.svg";
import LightModeIcon from "@material-design-icons/svg/outlined/light_mode.svg";
import { Outlet } from "react-router-dom";

export function Layout() {
  const theme = useTheme<Theme>();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Flex
        as="header"
        position="fixed"
        top={0}
        zIndex={200}
        width="100%"
        padding="1em 2em"
        alignItems="flex-end"
        borderBottom="1px solid"
        borderColor={
          colorMode === "dark" ? theme.colors.whiteAlpha[300] : theme.colors.gray[100]
        }
        background={
          colorMode === "dark" ? theme.colors.gray[700] : theme.colors.gray[100]
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
      <Container as="main" mt={20} maxW="unset" padding="1em 2em">
        <Outlet />
      </Container>
    </>
  );
}
