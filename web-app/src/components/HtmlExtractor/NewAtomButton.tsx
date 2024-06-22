import { ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export type NewAtomButtonProps = {
    onClick: () => void;
}

export const NewAtomButton = (props: NewAtomButtonProps) => {
  return (
    <ActionIcon variant="filled" size="xl" radius="xl" aria-label="Settings" onClick={props.onClick}>
      <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
    </ActionIcon>
  );
};
