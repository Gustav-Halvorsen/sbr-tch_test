import React, { useMemo } from "react";
import { TDictionary } from "../../types";
import { useHistory, useParams } from "react-router-dom";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

type TDictionaryProps = {
  path: string;
  dictionaries: TDictionary[];
};

export const Dictionary: React.FC<TDictionaryProps> = ({ dictionaries, path }) => {
  const { dictionaryId } = useParams<{ dictionaryId: string }>();
  const history = useHistory();
  const dictionaryToRender: TDictionary | undefined = useMemo(
    () => dictionaries.find((dictionary) => dictionary.id === dictionaryId),
    [dictionaries]
  );

  const handleClose = (): void => {
    history.push(path);
  };
  return (
    <>
      <Modal isOpen={true} onClose={handleClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{dictionaryToRender?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <Text>{dictionaryToRender?.description}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
