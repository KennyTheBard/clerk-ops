import { useState } from "react";
import { AppShell } from "@mantine/core";
import { ProcessOpsNavbar } from "./navbar/ProcessOpsNavbar";
import { Id } from "../../db/entries";

export const ProcessOpsPage = () => {
  const [selectedPipelineId, setSelectedPipelineId] = useState<
    Id | undefined
  >();

  return (
    <AppShell>
      <AppShell.Navbar w={300}>
        <ProcessOpsNavbar
          selectedPipelineId={selectedPipelineId}
          setSelectedPipelineId={setSelectedPipelineId}
        />
      </AppShell.Navbar>
      <AppShell.Main pl={300} pt={20}>
        {selectedPipelineId !== undefined && (
          selectedPipelineId
        )}
      </AppShell.Main>
    </AppShell>
  );
};
