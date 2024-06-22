import {
  Container,
  Group,
  Select,
  TextInput,
  Text,
  Button,
} from "@mantine/core";
import { useCallback, useEffect, useState } from "react";

const PADDING_SIZE = 40;

type QuerySelectorBuilderProps = {
    onChange: (value: string) => void;
};

export const QuerySelectorBuilder = (props: QuerySelectorBuilderProps) => {
  const [atoms, setAtoms] = useState<QuerySelectorAtom[]>([]);

  useEffect(() => {
    const querySelector = atoms
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
    props.onChange(querySelector);
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

  return (
    <Container>
      {atoms.map((atom, index) => (
        <Group pl={index * PADDING_SIZE} pt={12} key={atom.key}>
          <Select
            variant="filled"
            disabled={index === 0}
            value={atom.combinator}
            onChange={(value) => updateAtom(index, "combinator", value!)}
            defaultValue="descendant"
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
            leftSection={<Text c="dimmed">&lt;</Text>}
            rightSection={<Text c="dimmed">&gt;</Text>}
          />
          <TextInput
            variant="unstyled"
            onChange={(value) => updateAtom(index, "id", value.target.value)}
            leftSectionWidth={35}
            // w={100}
            leftSection={<Text c="dimmed">id =</Text>}
          />
          <TextInput
            variant="unstyled"
            onChange={(value) => updateAtom(index, "class", value.target.value)}
            leftSectionWidth={60}
            leftSection={<Text c="dimmed">class =</Text>}
          />
          {/* TODO: delete button */}
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

type Combinator =
  | "descendant"
  | "child"
  | "adjacent-sibling"
  | "general-sibling";

const combinatorSymbolMap: Record<Combinator, string> = {
  descendant: "",
  child: ">",
  "adjacent-sibling": "+",
  "general-sibling": "~",
};

type QuerySelectorAtom = {
  key: string;
  combinator?: Combinator;
  tag: string;
  id?: string;
  class?: string;
};
