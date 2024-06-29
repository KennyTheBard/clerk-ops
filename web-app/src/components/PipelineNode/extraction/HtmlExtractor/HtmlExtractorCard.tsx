import { Divider, Space, Switch, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { HtmlExtractorFnProps } from "../../../../lib/buildHtmlExtractorFn";
import { QuerySelectorCodeBlock } from "./QuerySelectorCodeBlock";
import {
  compileQuerySelectorString,
  QuerySelector,
} from "./QuerySelectorBuilder";
import { PipelineNodeCard } from "../../PipelineNodeCard";

export type HtmlExtractorCardProps = {
  setExtractorFnProps: (props: HtmlExtractorFnProps) => void;
};

export const HtmlExtractorCard = (props: HtmlExtractorCardProps) => {
  const [headersQuerySelector, setHeadersQuerySelector] =
    useState<QuerySelector>([]);
  const [rowsQuerySelector, setRowsQuerySelector] = useState<QuerySelector>([]);
  const [cellsQuerySelector, setCellsQuerySelector] = useState<QuerySelector>(
    []
  );

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
        cellsQuerySelector: compileQuerySelectorString(cellsQuerySelector),
        stripHtml: entriesStripHtml,
        trimSpaces: entriesTrimSpaces,
      },
    });
  }, [
    headersQuerySelector,
    rowsQuerySelector,
    cellsQuerySelector,
    headersStripHtml,
    entriesStripHtml,
    headersTrimSpaces,
    entriesTrimSpaces,
  ]);

  return (
    <PipelineNodeCard title="HTML Extractor" titleColor={"red"}>
        <Title order={5}>Headers</Title>
        <Space p={4} />
        <QuerySelectorCodeBlock
          modalTitle="Headers"
          querySelector={headersQuerySelector}
          setQuerySelector={setHeadersQuerySelector}
        />

        <Space pt={16} />
        <Switch
          label="Strip HTML tags from headers"
          size="md"
          onChange={(event) => setHeadersStripHtml(event.currentTarget.checked)}
        />
        <Space pt={8} />
        <Switch
          label="Trim spaces for headers"
          size="md"
          onChange={(event) =>
            setHeadersTrimSpaces(event.currentTarget.checked)
          }
        />
        <Space p={16} />
        <Divider />
        <Space p={8} />

        <Title order={5}>Rows</Title>
        <Space p={4} />
        <QuerySelectorCodeBlock
          modalTitle="Rows"
          querySelector={rowsQuerySelector}
          setQuerySelector={setRowsQuerySelector}
        />
        <Space pt={8} />

        <Title order={5}>Cells</Title>
        <Space p={4} />
        <QuerySelectorCodeBlock
          modalTitle="Cells"
          querySelector={cellsQuerySelector}
          setQuerySelector={setCellsQuerySelector}
        />

        <Space pt={16} />
        <Switch
          label="Strip HTML tags from cells"
          size="md"
          onChange={(event) => setEntriesStripHtml(event.currentTarget.checked)}
        />
        <Space pt={8} />
        <Switch
          label="Trim spaces from cells"
          size="md"
          onChange={(event) =>
            setEntriesTrimSpaces(event.currentTarget.checked)
          }
        />
    </PipelineNodeCard>
  );
};
