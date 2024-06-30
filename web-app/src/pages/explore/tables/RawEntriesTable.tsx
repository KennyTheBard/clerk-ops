import { useLiveQuery } from "dexie-react-hooks";
import { Id } from "../../../db/entries";
import { CellGrid } from "../../../components";
import {
  getRawEntriesBySchemaId,
  getRawSchemaById,
} from "../../../db/repositories";

export type RawEntriesTableProps = {
  rawSchemaId: Id;
};

export const RawEntriesTable = (props: RawEntriesTableProps) => {
  const rawSchema = useLiveQuery(
    () => getRawSchemaById(props.rawSchemaId),
    [props.rawSchemaId]
  );
  const rawEntries = useLiveQuery(
    () => getRawEntriesBySchemaId(props.rawSchemaId),
    [props.rawSchemaId]
  );

  return (
    <CellGrid
      headers={Object.keys(rawSchema?.schema ?? {})}
      entries={rawEntries?.map((entry) => entry.data) ?? []}
    />
  );
};
