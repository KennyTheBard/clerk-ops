import { Card, Divider, Title } from "@mantine/core";
import { QuerySelectorBuilder } from "./QuerySelectorBuilder";
import { useEffect, useState } from "react";
import { HtmlExtractorFnProps } from "../../lib/buildHtmlExtractorFn";

export type HtmlExtractorProps = {
  setExtractorFnProps: (props: HtmlExtractorFnProps) => void;
};

export const HtmlExtractor = (props: HtmlExtractorProps) => {
  const [headersQuerySelector, setHeadersQuerySelector] = useState<string>("");
  const [rowsQuerySelector, setRowsQuerySelector] = useState<string>("");
  const [columnsQuerySelector, setColumnsQuerySelector] = useState<string>("");

  useEffect(() => {
    props.setExtractorFnProps({
      headersQuerySelector,
      rowsQuerySelector,
      columnsQuerySelector,
    });
  }, [headersQuerySelector, rowsQuerySelector, columnsQuerySelector]);

  return (
    <Card shadow="sm" radius="md" withBorder>
      <Card.Section p={20} style={{ backgroundColor: "red" }}>
        <Title order={2}>HTML Extractor</Title>
      </Card.Section>
      <Divider />

      <Card.Section p={20}>
        <Title order={3}>Headers</Title>
        <QuerySelectorBuilder onChange={(value) => setHeadersQuerySelector(value)} />
      </Card.Section>
      <Divider />

      <Card.Section p={20}>
        <Title order={3}>Rows</Title>
        <QuerySelectorBuilder onChange={(value) => setRowsQuerySelector(value)} />
      </Card.Section>
      <Divider />

      <Card.Section p={20}>
        <Title order={3}>Columns</Title>
        <QuerySelectorBuilder onChange={(value) => setColumnsQuerySelector(value)} />
      </Card.Section>
    </Card>
  );
};
