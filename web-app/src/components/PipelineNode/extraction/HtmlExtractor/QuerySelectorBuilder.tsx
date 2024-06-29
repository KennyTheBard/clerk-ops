import {
  Container,
  Group,
  Select,
  TextInput,
  Text,
  Button,
  ActionIcon,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

const PADDING_SIZE = 40;

export type QuerySelectorBuilderProps = {
  initialValue: QuerySelector;
  onChange: (value: QuerySelector) => void;
};

export const QuerySelectorBuilder = (props: QuerySelectorBuilderProps) => {
  const [atoms, setAtoms] = useState<QuerySelector>(props.initialValue);

  useEffect(() => {
    props.onChange(atoms);
  }, [atoms]);

  const updateAtom = useCallback(
    (index: number, key: keyof QuerySelectorAtom, value: string) => {
      setAtoms((prev) => [
        ...prev.slice(0, index),
        {
          ...prev[index],
          [key]: value,
        },
        ...prev.slice(index + 1, prev.length),
      ]);
    },
    [atoms]
  );

  const deleteAtom = useCallback(
    (index: number) => {
      setAtoms((prev) => [
        ...prev.slice(0, index),
        ...prev.slice(index + 1, prev.length),
      ]);
    },
    [atoms]
  );

  return (
    <Container>
      {atoms.map((atom, index) => (
        <Group pl={index * PADDING_SIZE} pt={12} key={atom.key}>
          <ActionIcon
            variant="subtle"
            size="lg"
            radius="xl"
            color="red"
            onClick={() => deleteAtom(index)}
          >
            <IconX style={{ width: "80%", height: "80%" }} stroke={1.5} />
          </ActionIcon>
          <Select
            variant="filled"
            disabled={index === 0}
            value={atom.combinator}
            onChange={(value) => updateAtom(index, "combinator", value!)}
            checkIconPosition="right"
            rightSection={<></>}
            w={35}
            // TODO: use renderOption to display <<" " descendant>> in dropdown
            data={[
              { value: "descendant", label: "\u00A0" },
              { value: "child", label: ">" },
              { value: "adjacent-sibling", label: "+" },
              { value: "general-sibling", label: "~" },
            ]}
          />
          <TextInput
            variant="unstyled"
            placeholder="HTML Tag"
            onChange={(value) => updateAtom(index, "tag", value.target.value)}
            value={atom.tag}
            leftSection={<Text c="dimmed">&lt;</Text>}
            rightSection={<Text c="dimmed">&gt;</Text>}
          />
          <TextInput
            variant="unstyled"
            onChange={(value) => updateAtom(index, "id", value.target.value)}
            value={atom.id}
            leftSectionWidth={35}
            // w={100}
            leftSection={<Text c="dimmed">id =</Text>}
          />
          <TextInput
            variant="unstyled"
            onChange={(value) => updateAtom(index, "class", value.target.value)}
            value={atom.class}
            leftSectionWidth={60}
            leftSection={<Text c="dimmed">class =</Text>}
          />
        </Group>
      ))}
      <Group pl={atoms.length * PADDING_SIZE} pt={12}>
        <Button
          onClick={() => {
            setAtoms((prev) => [
              ...prev,
              {
                key: new Date().toISOString(),
                tag: "",
              },
            ]);
          }}
        >
          Add
        </Button>
      </Group>
    </Container>
  );
};

export type Combinator =
  | "descendant"
  | "child"
  | "adjacent-sibling"
  | "general-sibling";

export const combinatorSymbolMap: Record<Combinator, string> = {
  descendant: "",
  child: ">",
  "adjacent-sibling": "+",
  "general-sibling": "~",
};

export type QuerySelectorAtom = {
  key: string;
  combinator?: Combinator;
  tag: string;
  id?: string;
  class?: string;
};

export type QuerySelector = QuerySelectorAtom[];

export const compileQuerySelectorString = (qa: QuerySelector): string => {
  return qa
    .reduce(
      (acc, atom) =>
        [
          acc,
          " ",
          combinatorSymbolMap[atom.combinator ?? "descendant"],
          " ",
          atom.tag,
          atom.id ? `#${atom.id}` : "",
          atom.class ? `.${atom.class}` : "",
        ].join(""),
      ""
    )
    .replace(/\s+/g, " ")
    .trim();
};

