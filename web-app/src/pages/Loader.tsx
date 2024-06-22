import { Button, Stack, Table, Textarea, Title } from "@mantine/core";
import { useMemo, useRef, useState } from "react";
import { HtmlExtractor } from "../components";
import {
  buildHtmlExtractorFn,
  HtmlExtractorFnProps,
} from "../lib/buildHtmlExtractorFn";

export const LoaderPage = () => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [htmlExtractorFnProps, setHtmlExtractorFnProps] = useState<
    HtmlExtractorFnProps | undefined
  >();
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);

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
          {rows.map((row) => (
            <Table.Tr>
              {headers.map((header) => (
                <Table.Td>{row[header]}</Table.Td>
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
      <Textarea id="clerk-ops-textarea-input" ref={ref} cols={120} rows={16} />
      <HtmlExtractor
        setExtractorFnProps={(props) => {
          setHtmlExtractorFnProps(props);
        }}
      />
      <Button
        variant="filled"
        onClick={() => {
          if (ref.current && htmlExtractorFnProps) {
            const { headers, rows } = buildHtmlExtractorFn(
              htmlExtractorFnProps
            )(ref.current.value);
            setHeaders(headers);
            setRows(rows);
          }
        }}
      >
        Extract
      </Button>
      {resultTable}
    </Stack>
  );
};
