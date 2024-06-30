import { useState } from "react";
import { AppShell } from "@mantine/core";
import { ProcessOpsNavbar } from "./navbar/ProcessOpsNavbar";
import { Id } from "../../db/entries";
import { PipelineContainer } from "../../components/Pipeline/PipelineContainer";
import { Pipeline } from "../../model";

const pipeline: Pipeline = {
  "node1": {
    id: "node1",
    base: "one_to_one",
    input: undefined,
    output: "node2",
    type: "field_mapper",
    fields: ["description"],
    acceptedTypes: ["string"],
    subtype: "strip_html",
  },
  "node2": {
    id: "node2",
    base: "one_to_one",
    input: "node1",
    output: "node3",
    type: "field_mapper",
    fields: ["description"],
    acceptedTypes: ["string"],
    subtype: "trim_spaces",
  },
  "node3": {
    id: "node3",
    base: "one_to_one",
    input: "node2",
    output: "node4",
    type: "field_mapper",
    fields: ["description"],
    acceptedTypes: ["string"],
    subtype: "strip_html",
  },
  "node4": {
    id: "node4",
    base: "one_to_one",
    input: "node3",
    output: undefined,
    type: "field_mapper",
    fields: ["description"],
    acceptedTypes: ["string"],
    subtype: "trim_spaces",
  }
};

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
        <PipelineContainer pipeline={pipeline}/>
      </AppShell.Main>
    </AppShell>
  );
};
