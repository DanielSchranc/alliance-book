import { Flex, Theme, useColorMode, useTheme } from "@chakra-ui/react";

export function SubHeader(props: React.PropsWithChildren) {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  return (
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
      background={colorMode === "dark" ? theme.colors.gray[700] : theme.colors.gray[100]}
    >
      {props.children}
    </Flex>
  );
}
