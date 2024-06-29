import { Card, Title } from "@mantine/core";
import { Property } from "csstype";
import { ReactNode } from "react";

export type PipelineNodeCardProps = {
  title: string;
  titleColor: Property.BackgroundColor;
  children: ReactNode;
};

export const PipelineNodeCard = (props: PipelineNodeCardProps) => {
  return (
    <Card shadow="sm" radius="md" withBorder w={500}>
      <Card.Section p={16} style={{ backgroundColor: props.titleColor }}>
        <Title order={4}>{props.title}</Title>
      </Card.Section>

      <Card.Section p={16}>{props.children}</Card.Section>
    </Card>
  );
};
