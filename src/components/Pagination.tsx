import { ButtonGroup, HStack, IconButton, Text, chakra } from "@chakra-ui/react";
import FirstPageIcon from "@material-design-icons/svg/filled/first_page.svg";
import LastPageIcon from "@material-design-icons/svg/filled/last_page.svg";
import PrevPageIcon from "@material-design-icons/svg/filled/navigate_before.svg";
import NextPageIcon from "@material-design-icons/svg/filled/navigate_next.svg";

type PaginationProps = {
  page: number;
  total: number;
  onSetPage: (value: number) => void;
};

export function Pagination(props: PaginationProps) {
  const { page, total, onSetPage } = props;

  return (
    <HStack gap={8}>
      <ButtonGroup>
        <IconButton
          onClick={() => onSetPage(1)}
          isDisabled={page === 1}
          icon={<FirstPageIcon />}
          aria-label="First page"
          isRound={true}
          variant="ghost"
          size="sm"
        />
        <IconButton
          onClick={() => onSetPage(page - 1)}
          isDisabled={page === 1}
          icon={<PrevPageIcon />}
          aria-label="Previous page"
          isRound={true}
          variant="ghost"
          size="sm"
        />
        <Text alignSelf="center">
          <chakra.span>{"Page: "}</chakra.span>
          <chakra.b>
            {page}
            {" of "}
            {total}
          </chakra.b>
        </Text>
        <IconButton
          onClick={() => onSetPage(page + 1)}
          isDisabled={page === total}
          icon={<NextPageIcon />}
          aria-label="Next page"
          isRound={true}
          variant="ghost"
          size="sm"
        />
        <IconButton
          onClick={() => onSetPage(9)}
          isDisabled={page === total}
          icon={<LastPageIcon />}
          aria-label="Last page"
          isRound={true}
          variant="ghost"
          size="sm"
        />
      </ButtonGroup>
    </HStack>
  );
}
