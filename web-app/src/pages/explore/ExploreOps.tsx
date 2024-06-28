import { Accordion, AppShell, Button, Tabs } from "@mantine/core";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo, useState } from "react";
import { db } from "../../db/init";
import { Id } from "../../db/entries";
import { RawEntriesTable } from "./tables/RawEntriesTable";
import { RawActions } from "./actions/RawActions";

export const ExploreOpsPage = () => {
  const rawSchemas = useLiveQuery(() => db.rawSchemas.toArray(), []);
  const [selectedRawSchemaId, setSelectedRawSchemaId] = useState<
    Id | undefined
  >();

  const navbarContent = useMemo(() => {
    return (
      <Accordion transitionDuration={100} multiple={true}>
        <Accordion.Item key="raw" value={"raw"}>
          <Accordion.Control style={{ backgroundColor: "grey" }}>
            Raw
          </Accordion.Control>
          <Accordion.Panel>
            {rawSchemas?.map((schema) => {
              const isSelected = schema.id === selectedRawSchemaId;
              return (
                <Button
                  variant={isSelected ? "light" : "subtle"}
                  color={isSelected ? "blue" : "gray"}
                  fullWidth
                  onClick={() => setSelectedRawSchemaId(schema.id)}
                >
                  {schema.name}
                </Button>
              );
            })}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  }, [rawSchemas, selectedRawSchemaId]);

  return (
    <AppShell>
      <AppShell.Navbar w={300}>{navbarContent}</AppShell.Navbar>
      <AppShell.Main pl={300} pt={20}>
        {selectedRawSchemaId !== undefined && (
          <Tabs radius="md" defaultValue="gallery">
            <Tabs.List pl={5}>
              <Tabs.Tab value="schema">Schema</Tabs.Tab>
              <Tabs.Tab value="entries">Entries</Tabs.Tab>
              <Tabs.Tab value="pipelines">Pipelines</Tabs.Tab>
              <Tabs.Tab value="actions">Actions</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="schema">Schema</Tabs.Panel>

            <Tabs.Panel value="entries">
              <RawEntriesTable rawSchemaId={selectedRawSchemaId} />
            </Tabs.Panel>

            <Tabs.Panel value="pipelines">Pipelines</Tabs.Panel>
            <Tabs.Panel value="actions">
              <RawActions />
            </Tabs.Panel>
          </Tabs>
        )}
      </AppShell.Main>
    </AppShell>
  );
};
