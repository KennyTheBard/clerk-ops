import { Text } from "@mantine/core";
import { PipelineNodeCard } from "../../PipelineNodeCard";

export const StripHtmlCard = () => {
  // TODO: use string-strip-html for this purpose
  return (
    <PipelineNodeCard title="Strip HTML" titleColor="lime">
      <Text> test </Text>
    </PipelineNodeCard>
  );
};
