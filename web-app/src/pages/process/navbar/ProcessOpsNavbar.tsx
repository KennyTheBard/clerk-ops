import { Accordion, Button, Group } from "@mantine/core";
import { Id } from "../../../db/entries";
import { IconPlus } from "@tabler/icons-react";
import { useLiveQuery } from "dexie-react-hooks";
import {
  createProcessingPipeline,
  getAllProcessingPipelines,
} from "../../../db/repositories";

export type ExploreOpsNavbarProps = {
  selectedPipelineId: Id | undefined;
  setSelectedPipelineId: (schemaId: Id) => void;
};

export const ProcessOpsNavbar = ({
  selectedPipelineId,
  setSelectedPipelineId,
}: ExploreOpsNavbarProps) => {
  const pipelines = useLiveQuery(getAllProcessingPipelines, []);

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
          <Group justify="space-around" pt={7}>
            <Button
              variant="light"
              color="gray"
              leftSection={<IconPlus />}
              onClick={() =>
                createProcessingPipeline({ name: getDefaultPipelineName() })
              }
            >
              New
            </Button>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

const getDefaultPipelineName = (): string => `pipeline_${new Date().getTime()}`;
