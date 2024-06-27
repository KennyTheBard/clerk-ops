import { Table } from "@mantine/core";

export type CellGridProps = {
  // TODO: better typing
  headers: string[]; // TODO: replace with schema
  entries: Record<string, string>[];
};

export const CellGrid = (props: CellGridProps) => {
  return (
    <Table striped withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          {props.headers.map((header) => (
            <Table.Th>{header}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {props.entries.map((entry) => (
          <Table.Tr>
            {props.headers.map((header) => (
              <Table.Td>{entry[header]}</Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
