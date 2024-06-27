import {
  Card,
  Divider,
  Space,
  Switch,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { HtmlExtractorFnProps } from "../../lib/buildHtmlExtractorFn";
import { QuerySelectorCodeBlock } from "./QuerySelectorCodeBlock";
import { compileQuerySelectorString, QuerySelector } from "./QuerySelectorBuilder";

export type HtmlExtractorProps = {
  setExtractorFnProps: (props: HtmlExtractorFnProps) => void;
};

export const HtmlExtractor = (props: HtmlExtractorProps) => {
  // TODO: rename columns to cells for clarity
  const [headersQuerySelector, setHeadersQuerySelector] = useState<QuerySelector>([]);
  const [rowsQuerySelector, setRowsQuerySelector] = useState<QuerySelector>([]);
  const [columnsQuerySelector, setColumnsQuerySelector] = useState<QuerySelector>([]);

  const [headersStripHtml, setHeadersStripHtml] = useState<boolean>(false);
  const [entriesStripHtml, setEntriesStripHtml] = useState<boolean>(false);

  const [headersTrimSpaces, setHeadersTrimSpaces] = useState<boolean>(false);
  const [entriesTrimSpaces, setEntriesTrimSpaces] = useState<boolean>(false);

  useEffect(() => {
    props.setExtractorFnProps({
      headers: {
        querySelector: compileQuerySelectorString(headersQuerySelector),
        stripHtml: headersStripHtml,
        trimSpaces: headersTrimSpaces,
      },
      entries: {
        rowsQuerySelector: compileQuerySelectorString(rowsQuerySelector),
        columnsQuerySelector: compileQuerySelectorString(columnsQuerySelector),
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
        <QuerySelectorCodeBlock
          modalTitle="Headers"
          querySelector={headersQuerySelector}
          setQuerySelector={setHeadersQuerySelector}
        />
        <Space pt={12} />
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
      </Card.Section>
      <Divider />

      <Card.Section p={20}>
        <Title order={3}>Entries</Title>
        <Space pt={12} />
        <Title order={5}>Rows</Title>
        <QuerySelectorCodeBlock
          modalTitle="Rows"
          querySelector={rowsQuerySelector}
          setQuerySelector={setRowsQuerySelector}
        />
        <Space pt={12} />
        <Title order={5}>Columns</Title>
        <Space pt={12} />
        <QuerySelectorCodeBlock
          modalTitle="Columns"
          querySelector={columnsQuerySelector}
          setQuerySelector={setColumnsQuerySelector}
        />
        <Space pt={12} />
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
