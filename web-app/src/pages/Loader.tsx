import { Button, Stack, Table, Textarea, Title } from "@mantine/core";
import { useCallback, useMemo, useRef, useState } from "react";
import { HtmlExtractor } from "../components";
import {
  buildHtmlExtractorFn,
  HtmlExtractorFnProps,
} from "../lib/buildHtmlExtractorFn";
import { prettifyHtml } from "../lib/prettifyHtml";
import { createRawSchema, insertBulkRawEntry } from "../db/repositories";
import { db } from "../db/init";
import { useLiveQuery } from "dexie-react-hooks";
import { Id } from "../db/entries";

export const LoaderPage = () => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [htmlExtractorFnProps, setHtmlExtractorFnProps] = useState<
    HtmlExtractorFnProps | undefined
  >();
  const [headers, setHeaders] = useState<string[]>([]);
  const [rawSchemaId, setRawSchemaId] = useState<Id | undefined>();
  // const [rows, setRows] = useState<Record<string, string>[]>([]);
  const rows = useLiveQuery(() => rawSchemaId ? db.rawEntries.where('rawSchemaId').equals(rawSchemaId).toArray() : [], [rawSchemaId]);

  const onClickExtract = useCallback(async () => {
    if (ref.current && htmlExtractorFnProps) {
      const { headers, rows } = buildHtmlExtractorFn(htmlExtractorFnProps)(
        ref.current.value
      );
      setHeaders(headers);
      // setRows(rows);
      const id = await createRawSchema({
        name: `raw_test_${new Date().getTime()}`,
      });
      setRawSchemaId(id);
      await insertBulkRawEntry({
        entries: rows,
        rawSchemaId: id,
      });
    }
  }, [ref, htmlExtractorFnProps, setHeaders]);

  const resultTable = useMemo(() => {
    return (
      <Table striped withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            {headers.map((header) => (
              <Table.Th>{header}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows?.map((row) => (
            <Table.Tr>
              {headers.map((header) => (
                <Table.Td>{row.data[header]}</Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    );
  }, [headers, rows]);

  return (
    <Stack align="stretch" justify="center" gap="md">
      <Title order={3}>Load your data here</Title>
      <Button
        variant="outline"
        onClick={async () => {
          if (ref.current) {
            ref.current.value = await prettifyHtml(ref.current.value);
          }
        }}
      >
        Prettify
      </Button>
      <Textarea
        id="clerk-ops-textarea-input"
        ref={ref}
        cols={120}
        rows={16}
        resize="vertical"
      />
      <HtmlExtractor
        setExtractorFnProps={(props) => {
          setHtmlExtractorFnProps(props);
        }}
      />
      <Button variant="filled" onClick={onClickExtract}>
        Extract
      </Button>
      {resultTable}
    </Stack>
  );
};
