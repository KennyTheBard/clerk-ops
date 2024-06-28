import { AppShell, Tabs } from "@mantine/core";
import { useState } from "react";
import { Id } from "../../db/entries";
import { RawEntriesTable } from "./tables/RawEntriesTable";
import { RawActions } from "./actions/RawActions";
import { ExploreOpsNavbar } from "./navbar/ExporeOpsNavbar";

export const ExploreOpsPage = () => {
  const [selectedRawSchemaId, setSelectedRawSchemaId] = useState<
    Id | undefined
  >();

  return (
    <AppShell>
      <AppShell.Navbar w={300}>
        <ExploreOpsNavbar
          selectedRawSchemaId={selectedRawSchemaId}
          selectSchemaId={setSelectedRawSchemaId}
        />
      </AppShell.Navbar>
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
