import { Stack, Textarea, Title } from "@mantine/core";

export const LoaderPage = () => {
  return <Stack
    h={300}
    align="stretch"
    justify="center"
    gap="md"
  >
    <Title order={3}>Load your data here</Title>
    <Textarea id="clerk-ops-textarea-input" cols={120} rows={16}/>
  </Stack>;
};
