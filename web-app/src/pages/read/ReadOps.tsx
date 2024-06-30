import { Button, Stack, Textarea, Title } from "@mantine/core";
import { useCallback, useMemo, useRef, useState } from "react";
import { CellGrid, HtmlExtractorCard } from "../../components";
import {
  buildHtmlExtractorFn,
  HtmlExtractorFnProps,
} from "../../lib/buildHtmlExtractorFn";
import { useLiveQuery } from "dexie-react-hooks";
import { FieldSchema, Id } from "../../db/entries";
import { prettifyHtmlFn } from "../../lib/textManipulation";
import {
  createRawSchema,
  getRawEntriesBySchemaId,
  insertBulkRawEntry,
} from "../../db/repositories";

export const ReadOpsPage = () => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [htmlExtractorFnProps, setHtmlExtractorFnProps] = useState<
    HtmlExtractorFnProps | undefined
  >();
  const [headers, setHeaders] = useState<string[]>([]);
  const [rawSchemaId, setRawSchemaId] = useState<Id | undefined>();
  const rows = useLiveQuery(
    () => (rawSchemaId ? getRawEntriesBySchemaId(rawSchemaId) : []),
    [rawSchemaId]
  );

  const onClickExtract = useCallback(async () => {
    if (ref.current && htmlExtractorFnProps) {
      const { headers, rows } = buildHtmlExtractorFn(htmlExtractorFnProps)(
        ref.current.value
      );
      setHeaders(headers);
      const schemaName = getDefaultRawSchemaName();
      const id = await createRawSchema({
        name: schemaName,
        schema: headers.reduce(
          (acc, header, index) => ({
            ...acc,
            [header]: {
              type: "string",
              required: false,
              index,
            },
          }),
          {} as Record<string, FieldSchema>
        ),
      });
      setRawSchemaId(id);
      await insertBulkRawEntry({
        entries: rows,
        rawSchemaId: id,
      });
    }
  }, [ref, htmlExtractorFnProps, setHeaders]);

  const resultTable = useMemo(
    () =>
      rows && (
        <CellGrid headers={headers} entries={rows.map((row) => row.data)} />
      ),
    [headers, rows]
  );

  return (
    <Stack align="center" justify="flex-start" gap="md">
      <Title order={3}>Load your data here</Title>
      <Button
        variant="outline"
        onClick={async () => {
          if (ref.current) {
            ref.current.value = await prettifyHtmlFn(ref.current.value);
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
      <HtmlExtractorCard
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

const getDefaultRawSchemaName = (): string =>
  `raw_test_${new Date().getTime()}`;
