import { Modal, Code } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  compileQuerySelectorString,
  QuerySelector,
  QuerySelectorBuilder,
} from "./QuerySelectorBuilder";

export type QuerySelectorCodeBlockProps = {
  querySelector: QuerySelector;
  modalTitle: string;
  setQuerySelector: (value: QuerySelector) => void;
};

const EMPTY_CODE_BLOCK_COLOR = "#e1e3e5";

export const QuerySelectorCodeBlock = (props: QuerySelectorCodeBlockProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        size="55rem"
        opened={opened}
        onClose={close}
        title={props.modalTitle}
      >
        <Code
          block
          color={
            compileQuerySelectorString(props.querySelector)
              ? undefined
              : EMPTY_CODE_BLOCK_COLOR
          }
        >
          {compileQuerySelectorString(props.querySelector)
            ? compileQuerySelectorString(props.querySelector)
            : "// query selector"}
        </Code>
        <QuerySelectorBuilder
          initialValue={props.querySelector}
          onChange={(value) => {
            if (
              compileQuerySelectorString(value) !==
              compileQuerySelectorString(props.querySelector)
            ) {
              props.setQuerySelector(value);
            }
          }}
        />
      </Modal>
      <Code
        block
        onClick={open}
        color={
          compileQuerySelectorString(props.querySelector)
            ? undefined
            : EMPTY_CODE_BLOCK_COLOR
        }
      >
        {compileQuerySelectorString(props.querySelector)
          ? compileQuerySelectorString(props.querySelector)
          : "// press here to configure a query selector"}
      </Code>
    </>
  );
};
