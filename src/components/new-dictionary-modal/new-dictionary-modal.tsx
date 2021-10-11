import React, { useRef } from "react";
import { TDictionary } from "types";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type TNewDictionaryModalProps = {
  data: TDictionary;
  onClose: () => void;
  isOpen: boolean;
  onSubmit: () => void;
  resetForm: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const NewDictionaryModal: React.FC<TNewDictionaryModalProps> = ({
  data,
  isOpen,
  onClose,
  onSubmit,
  onChange,
  resetForm,
}): JSX.Element => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const handleClose = (): void => {
    resetForm();
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} initialFocusRef={titleInputRef} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Новый справочник</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Название</FormLabel>
              <Input
                name="title"
                value={data.title}
                onChange={onChange}
                placeholder="Введите название"
                ref={titleInputRef}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Описание</FormLabel>
              <Input
                name="description"
                onChange={onChange}
                value={data.description}
                placeholder="Введите краткое описание"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleClose} mr={3}>
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              colorScheme="blue"
              disabled={data.title === "" || data.description === ""}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
