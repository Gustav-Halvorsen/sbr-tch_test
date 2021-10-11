import React, { useRef } from "react";
import { useVirtual } from "react-virtual";
import { TDictionary } from "types";
import { Box, Heading, List, ListItem, Text, IconButton, Flex } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useWindowDimensions } from "hooks";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { Dictionary } from "components";

type DictionaryListProps = {
  dictionaries: TDictionary[];
  onDelete: (id: string) => void;
};

export const DictionaryList: React.FC<DictionaryListProps> = ({ dictionaries, onDelete }): JSX.Element => {
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const { height } = useWindowDimensions();

  const { path } = useRouteMatch();
  const history = useHistory();
  const calcListHeight = (): number => {
    if (listWrapperRef.current) {
      return height - (listWrapperRef.current.offsetTop + 24);
    }
    return 512;
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string): void => {
    e.stopPropagation();
    onDelete(id);
  };
  const rowVirtualizer = useVirtual({
    size: dictionaries.length,
    parentRef: listWrapperRef,
    estimateSize: React.useCallback(() => 100, []),
    overscan: 5,
  });

  return (
    <>
      <Box ref={listWrapperRef} h={calcListHeight()} overflowY="auto">
        <List px={4} h={rowVirtualizer.totalSize} position="relative">
          {rowVirtualizer.virtualItems.map((row) => (
            <ListItem
              key={dictionaries[row.index].id}
              p={4}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="sm"
              overflow="hidden"
              position="absolute"
              top={0}
              left={0}
              width="calc(100% - 16px)"
              h={90}
              mb={4}
              _hover={{
                backgroundColor: "gray.50",
                cursor: "pointer",
              }}
              transform={`translateY(${row.start}px)`}
              onClick={() => history.push(`${path}/${dictionaries[row.index].id}`)}
            >
              <Flex align={"center"}>
                <Box overflow={"hidden"} mr={8}>
                  <Heading as="h4" size="md" mb={2}>
                    {dictionaries[row.index].title}
                  </Heading>
                  <Text textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={"hidden"}>
                    {dictionaries[row.index].description}
                  </Text>
                </Box>
                <IconButton
                  aria-label={"Delete dict"}
                  icon={<DeleteIcon />}
                  ml={"auto"}
                  colorScheme={"red"}
                  zIndex={2}
                  onClick={(e) => handleDelete(e, dictionaries[row.index].id)}
                />
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
      <Switch>
        <Route path={`${path}/:dictionaryId`}>
          <Dictionary dictionaries={dictionaries} path={path} />
        </Route>
      </Switch>
    </>
  );
};
