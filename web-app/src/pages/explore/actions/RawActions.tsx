import {
  Button,
  Container,
  Group,
  Modal,
  rem,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

export const RawActions = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container p={20} mx={0}>
      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={2}>Confirm deletion</Title>}
      >
        <Title order={4}>Are you sure?</Title>
        <Space p={4} />
        <Text>
          This operation is not reversible and the containing entries will be
          lost forever.
        </Text>
        <Space p={10} />
        <Group justify="space-between">
          <Button color="grey" onClick={close}>
            Nevermind.
          </Button>
          <Button
            color="red"
            onClick={() => {
              close();
              const id = notifications.show({
                loading: true,
                title: "Deleting this table",
                message: "This might take a second or two.",
                autoClose: false,
                withCloseButton: false,
              });

              setTimeout(() => {
                notifications.update({
                  id,
                  color: "green",
                  title: "Deletion complete",
                  message: "The table and all its entries have been removed,",
                  icon: (
                    <IconCheck style={{ width: rem(18), height: rem(18) }} />
                  ),
                  loading: false,
                  autoClose: 2000,
                });
              }, 3000);
            }}
          >
            Yes, delete it!
          </Button>
        </Group>
      </Modal>
      <Stack align="flex-start" justify="flex-start" gap="md">
        <Group justify="space-between">
          <Button size="xl" variant="outline" color="red" onClick={open}>
            Delete
          </Button>
          <Stack align="flex-start" justify="flex-start" gap="md">
            <Title order={4}>Delete this table permanently.</Title>
            <Text>
              This will cause irreversible loss of data, please double check
              that this is the correct table you want too delete.
            </Text>
          </Stack>
        </Group>
        {/* TODO: merge option */}
        {/* TODO: rename option */}
      </Stack>
    </Container>
  );
};
