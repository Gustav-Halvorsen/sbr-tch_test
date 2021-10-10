import { Box, Button, Flex, Heading, Input, Text, useDisclosure } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import type { TDictionary } from "./data";
import mockData from "mock/MOCK_DATA.json";
import { DictionaryList } from "../dictionary-list";
import { NewDictionaryModal } from "../new-dictionary-modal";

export const DictionaryPage: React.FC = () => {
  const [dictionaries, setDictionaries] = useState<TDictionary[]>(mockData);
  const [filteredDictionaries, setFilteredDictionaries] = useState<TDictionary[]>([] as TDictionary[]);
  const [filterValue, setFilterValue] = useState("");
  const [newDictionaryForm, setNewDictionaryForm] = useState<TDictionary>({
    id: "",
    title: "",
    description: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFilterInputChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterValue(evt.target.value);
  };
  const handleDelete = (id: string): void => {
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
  };

  useEffect(() => {
    if (filterValue) {
      setFilteredDictionaries(
        dictionaries.filter((dictionary) => {
          return dictionary.title.includes(filterValue);
        })
      );
    }
  }, [filterValue]);

  const renderList = (): JSX.Element => {
    if (filterValue && filteredDictionaries.length > 0) {
      return <DictionaryList onDelete={handleDelete} dictionaries={filteredDictionaries} />;
    } else if (filterValue && filteredDictionaries.length === 0) {
      return <Text>Ничего не найдено</Text>;
    }
    return <DictionaryList onDelete={handleDelete} dictionaries={dictionaries} />;
  };

  return (
    <>
      <Box h="calc(100% - 96px)">
        <Flex align={"center"} justify={"space-between"} mb={8}>
          <Heading as="h3">Dictionary</Heading>
          <Button ml={"auto"} colorScheme={"green"} onClick={onOpen}>
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
        {renderList()}
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
