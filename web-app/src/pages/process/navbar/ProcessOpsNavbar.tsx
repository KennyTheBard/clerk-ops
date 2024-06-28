import { Accordion, Button } from "@mantine/core";
import { Id } from "../../../db/entries";
import { ProcessingPipeline } from "../../../db/entries/ProcessingPipeline";

export type ExploreOpsNavbarProps = {
  selectedPipelineId: Id | undefined;
  setSelectedPipelineId: (schemaId: Id) => void;
};

export const ProcessOpsNavbar = ({
  selectedPipelineId,
  setSelectedPipelineId,
}: ExploreOpsNavbarProps) => {
  const pipelines: ProcessingPipeline[] = [];

  return (
    <Accordion transitionDuration={100} multiple={true}>
      <Accordion.Item key="processing" value={"processing"}>
        <Accordion.Control style={{ backgroundColor: "grey" }}>
          Processing
        </Accordion.Control>
        <Accordion.Panel>
          {pipelines?.map((pipeline) => {
            const isSelected = pipeline.id === selectedPipelineId;
            return (
              <Button
                variant={isSelected ? "light" : "subtle"}
                color={isSelected ? "blue" : "gray"}
                fullWidth
                onClick={() => setSelectedPipelineId(pipeline.id)}
              >
                {pipeline.name}
              </Button>
            );
          })}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
