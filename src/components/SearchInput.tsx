import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import SearchIcon from "@material-design-icons/svg/filled/search.svg";
import * as React from "react";

import { debounce } from "../utils/debounce";

type SearchInputProps = {
  placeholder: string;
  onSearch: (value: string) => void;
};

export function SearchInput(props: SearchInputProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const debounced = debounce((value: string) => {
      props.onSearch(value);
    }, 700);
    debounced(event.target.value);
  };

  return (
    <Box width={{ base: "100%", md: "auto" }}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon />
        </InputLeftElement>
        <Input
          type="search"
          name="Search"
          onChange={handleSearch}
          placeholder={props.placeholder}
        />
      </InputGroup>
    </Box>
  );
}
