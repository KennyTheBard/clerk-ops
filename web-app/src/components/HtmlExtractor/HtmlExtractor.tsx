import { Card, Code, Divider, Space, Switch, Title } from "@mantine/core";
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

  const [headersStripHtml, setHeadersStripHtml] = useState<boolean>(false);
  const [columnsStripHtml, setColumnsStripHtml] = useState<boolean>(false);

  useEffect(() => {
    props.setExtractorFnProps({
      headers: {
        querySelector: headersQuerySelector,
        stripHtml: headersStripHtml,
      },
      rows: {
        querySelector: rowsQuerySelector,
      },
      columns: {
        querySelector: columnsQuerySelector,
        stripHtml: columnsStripHtml,
      },
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
        <Space pt={12} />
        {headersQuerySelector && (
          <>
            <Code block>{headersQuerySelector}</Code>
            <Space pt={12} />
          </>
        )}
        <Switch
          label="Strip HTML tags"
          size="md"
          onChange={(event) => setHeadersStripHtml(event.currentTarget.checked)}
        />
        <QuerySelectorBuilder
          onChange={(value) => setHeadersQuerySelector(value)}
        />
      </Card.Section>
      <Divider />

      <Card.Section p={20}>
        <Title order={3}>Rows</Title>
        <Space pt={12} />
        {rowsQuerySelector && (
          <>
            <Code block>{rowsQuerySelector}</Code>
            <Space pt={12} />
          </>
        )}
        <QuerySelectorBuilder
          onChange={(value) => setRowsQuerySelector(value)}
        />
      </Card.Section>
      <Divider />

      <Card.Section p={20}>
        <Title order={3}>Columns</Title>
        <Space pt={12} />
        {columnsQuerySelector && (
          <>
            <Code block>{columnsQuerySelector}</Code>
            <Space pt={12} />
          </>
        )}
        <Switch
          label="Strip HTML tags"
          size="md"
          onChange={(event) => setColumnsStripHtml(event.currentTarget.checked)}
        />
        <QuerySelectorBuilder
          onChange={(value) => setColumnsQuerySelector(value)}
        />
      </Card.Section>
    </Card>
  );
};
