import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  SelectFieldProps,
  chakra,
} from "@chakra-ui/react";

type SelectProps = SelectFieldProps &
  ChakraSelectProps & {
    options: string[];
  };

export function Select(props: SelectProps) {
  return (
    <ChakraSelect width={{ base: "100%", md: "auto" }} {...props}>
      {props.options.map((option, index) => (
        <chakra.option key={`${option}_${index}`} value={option}>
          {option}
        </chakra.option>
      ))}
    </ChakraSelect>
  );
}
