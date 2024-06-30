import { Text } from "@mantine/core";
import { PipelineNodeCard } from "../../PipelineNodeCard";

export const StripHtmlCard = () => {
  return (
    <PipelineNodeCard title="Strip HTML" titleColor="lime">
      <Text> test </Text>
    </PipelineNodeCard>
  );
};
