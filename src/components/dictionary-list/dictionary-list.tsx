import React, { useRef } from "react";
import { useVirtual } from "react-virtual";
import { TDictionary } from "../dictionary-page/data";
import { Box, Heading, List, ListItem, Text, IconButton, Flex } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useWindowDimensions } from "hooks";

type DictionaryListProps = {
  dictionaries: TDictionary[];
  onDelete: (id: string) => void;
};

export const DictionaryList: React.FC<DictionaryListProps> = ({ dictionaries, onDelete }): JSX.Element => {
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const { height } = useWindowDimensions();

  const calcListHeight = (): number => {
    if (listWrapperRef.current) {
      return height - (listWrapperRef.current.offsetTop + 24);
    }
    return 512;
  };

  const rowVirtualizer = useVirtual({
    size: dictionaries.length,
    parentRef: listWrapperRef,
    estimateSize: React.useCallback(() => 100, []),
    overscan: 5,
  });

  return (
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
            transform={`translateY(${row.start}px)`}
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
                onClick={() => onDelete(dictionaries[row.index].id)}
              />
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
