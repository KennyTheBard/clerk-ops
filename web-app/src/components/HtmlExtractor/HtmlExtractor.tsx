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
  const [entriesStripHtml, setEntriesStripHtml] = useState<boolean>(false);

  const [headersTrimSpaces, setHeadersTrimSpaces] = useState<boolean>(false);
  const [entriesTrimSpaces, setEntriesTrimSpaces] = useState<boolean>(false);

  useEffect(() => {
    props.setExtractorFnProps({
      headers: {
        querySelector: headersQuerySelector,
        stripHtml: headersStripHtml,
        trimSpaces: headersTrimSpaces,
      },
      entries: {
        rowsQuerySelector,
        columnsQuerySelector,
        stripHtml: entriesStripHtml,
        trimSpaces: entriesTrimSpaces,
      },
    });
  }, [
    headersQuerySelector,
    rowsQuerySelector,
    columnsQuerySelector,
    headersStripHtml,
    entriesStripHtml,
    headersTrimSpaces,
    entriesTrimSpaces,
  ]);

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
        <Space pt={8} />
        <Switch
          label="Trim spaces"
          size="md"
          onChange={(event) =>
            setHeadersTrimSpaces(event.currentTarget.checked)
          }
        />
        <QuerySelectorBuilder
          onChange={(value) => setHeadersQuerySelector(value)}
        />
      </Card.Section>
      <Divider />

      <Card.Section p={20}>
        <Title order={3}>Entries</Title>
        <Space pt={12} />
        <Title order={5}>Rows</Title>
        {rowsQuerySelector && (
          <>
            <Code block>{rowsQuerySelector}</Code>
            <Space pt={12} />
          </>
        )}
        <QuerySelectorBuilder
          onChange={(value) => setRowsQuerySelector(value)}
        />
        <Title order={5}>Columns</Title>
        <Space pt={12} />
        {columnsQuerySelector && (
          <>
            <Code block>{columnsQuerySelector}</Code>
            <Space pt={12} />
          </>
        )}
        <QuerySelectorBuilder
          onChange={(value) => setColumnsQuerySelector(value)}
        />
        <Switch
          label="Strip HTML tags"
          size="md"
          onChange={(event) => setEntriesStripHtml(event.currentTarget.checked)}
        />
        <Space pt={8} />
        <Switch
          label="Trim spaces"
          size="md"
          onChange={(event) =>
            setEntriesTrimSpaces(event.currentTarget.checked)
          }
        />
      </Card.Section>
      <Divider />

      <Card.Section p={20}></Card.Section>
    </Card>
  );
};
