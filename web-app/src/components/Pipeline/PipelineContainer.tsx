import { Container, Group, Stack } from "@mantine/core";
import { Pipeline, PipelineNode } from "../../model";
import { useMemo } from "react";
import { getCardForPipelineNode } from "./getCardForPipelineNode";

export type PipelineContainerProps = {
  pipeline: Pipeline;
};

export const PipelineContainer = (props: PipelineContainerProps) => {
  const nodes = useMemo(() => {
    if (!Object.values(props.pipeline).length) {
      return [];
    }

    let first: PipelineNode = Object.values(props.pipeline)[0];
    let last: PipelineNode = first;
    const nodes: PipelineNode[] = [first];
    while (first.input) {
      first = props.pipeline[first.input];
      nodes.unshift(first);
    }
    while (last.output) {
      last = props.pipeline[last.output];
      nodes.unshift(last);
    }
    return nodes;
  }, [props.pipeline]);

  return (
      <Stack align="flex-start" justify="flex-start" gap={0} p={20}>
        {nodes.map((node, index) => (
          <>
            {index > 0 && (
              // TODO: extract this into a separate component
              // TODO: replace margin left with something better
              <Group justify="space-around">
                <div
                  style={{
                    backgroundColor: "cyan",
                    width: 4,
                    height: 50,
                    marginLeft: 250,
                    boxShadow: "0 0 4px cyan",
                  }}
                />
              </Group>
            )}
            {getCardForPipelineNode(node)}
          </>
        ))}
      </Stack>
  );
};
