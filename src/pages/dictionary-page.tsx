import { Box, Button, Flex, Heading, Input, Spinner, Text, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import mockData from "mock/MOCK_DATA.json";
import { DictionaryList, NewDictionaryModal } from "components";
import { useDebounce } from "hooks";
import { TDictionary } from "types";

export const DictionaryPage: React.FC = () => {
  const [dictionaries, setDictionaries] = useState<TDictionary[]>(mockData);
  const [filteredDictionaries, setFilteredDictionaries] = useState<TDictionary[]>([] as TDictionary[]);
  const [filterValue, setFilterValue] = useState("");
  const [newDictionaryForm, setNewDictionaryForm] = useState<TDictionary>({
    id: "",
    title: "",
    description: "",
  });
  const [isFiltering, setFiltering] = useState(false);
  const debouncedFilterValue = useDebounce<string>(filterValue, 300);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const notification = useToast();

  useEffect(() => {
    if (filterValue !== "" && debouncedFilterValue === "") {
      setFiltering(true);
    }
  }, [filterValue, debouncedFilterValue]);

  useEffect(() => {
    if (debouncedFilterValue) {
      setFilteredDictionaries(
        dictionaries.filter((dictionary) => {
          return dictionary.title.includes(debouncedFilterValue);
        })
      );

      setFiltering(false);
    }
  }, [debouncedFilterValue]);

  const handleFilterInputChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterValue(evt.target.value);
  };

  const handleDictionaryDelete = (id: string): void => {
    if (filteredDictionaries.length > 0) {
      setFilteredDictionaries((state) => {
        return state.filter((dictionary) => dictionary.id !== id);
      });
    }
    setDictionaries((state) => {
      return state.filter((dictionary) => dictionary.id !== id);
    });
  };

  const resetNewDictionaryForm = (): void =>
    setNewDictionaryForm({
      id: "",
      title: "",
      description: "",
    });

  const handleChangeNewDictionaryForm = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { name } = evt.target;
    setNewDictionaryForm((prevData) => ({
      ...prevData,
      [name]: evt.target.value,
    }));
  };

  const handleAddDictionary = (): void => {
    resetNewDictionaryForm();
    setDictionaries((dictionaries) => [
      { ...newDictionaryForm, id: new Date().getTime().toString() },
      ...dictionaries,
    ]);
    onClose();
    notification({
      title: "Справочник добавлен",
      description: newDictionaryForm.title,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const renderDictionariesList = (): JSX.Element => {
    if (debouncedFilterValue && filteredDictionaries.length > 0) {
      return <DictionaryList onDelete={handleDictionaryDelete} dictionaries={filteredDictionaries} />;
    } else if (debouncedFilterValue && filteredDictionaries.length === 0) {
      return (
        <Flex justify={"center"} mt={8}>
          <Text fontSize={"xl"}>Ничего не найдено</Text>
        </Flex>
      );
    }
    return <DictionaryList onDelete={handleDictionaryDelete} dictionaries={dictionaries} />;
  };

  return (
    <>
      <Box h="calc(100% - 96px)">
        <Flex align={"center"} justify={"space-between"} mb={8}>
          <Heading as="h3" fontWeight={500} mb={8}>
            Справочники
          </Heading>
          <Button ml={"auto"} colorScheme={"blue"} onClick={onOpen}>
            Добавить
          </Button>
        </Flex>
        <Input
          value={filterValue}
          onChange={handleFilterInputChange}
          placeholder="Введите название"
          type="text"
          name="filter"
          size="lg"
          mb={4}
        />
        {isFiltering ? (
          <Flex justify={"center"} mt={8}>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          </Flex>
        ) : (
          renderDictionariesList()
        )}
      </Box>
      <NewDictionaryModal
        data={newDictionaryForm}
        resetForm={resetNewDictionaryForm}
        onClose={onClose}
        isOpen={isOpen}
        onChange={handleChangeNewDictionaryForm}
        onSubmit={handleAddDictionary}
      />
    </>
  );
};
