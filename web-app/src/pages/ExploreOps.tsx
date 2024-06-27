import { Accordion, AppShell, Group, Skeleton, Tabs } from "@mantine/core";
import { useMemo, useState } from "react";

export const ExploreOpsPage = () => {
  const [schemas] = useState<Record<string, string[]>>({
    meta: ["schemas", "pipelines"],
    raw: ["test1", "test2"],
  });
  const navbarContent = useMemo(() => {
    return (
      <Accordion transitionDuration={100} multiple={true}>
        {Object.keys(schemas).map((schema) => (
          <Accordion.Item key={schema} value={schema}>
            <Accordion.Control>{schema}</Accordion.Control>
            <Accordion.Panel>
              {schemas[schema].map((entry) => (
                <Group>{entry}</Group>
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  }, [schemas]);

  return (
    <AppShell>
      <AppShell.Navbar w={300} p="md">
        {navbarContent}
      </AppShell.Navbar>
      <AppShell.Main pl={300} pt={20}>
        <Tabs  variant="outline" radius="md" defaultValue="gallery">
          <Tabs.List pl={5}>
            <Tabs.Tab value="schema">Schema</Tabs.Tab>
            <Tabs.Tab value="entries">Entries</Tabs.Tab>
            <Tabs.Tab value="pipelines">Pipelines</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="schema">Schema</Tabs.Panel>

          <Tabs.Panel value="entries">Entries</Tabs.Panel>

          <Tabs.Panel value="pipelines">Pipelines</Tabs.Panel>
        </Tabs>
      </AppShell.Main>
    </AppShell>
  );
};
