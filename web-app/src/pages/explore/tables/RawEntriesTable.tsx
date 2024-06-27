import { useLiveQuery } from "dexie-react-hooks";
import { Id } from "../../../db/entries";
import { db } from "../../../db/init";
import { CellGrid } from "../../../components";

export type RawEntriesTableProps = {
  rawSchemaId: Id;
};

export const RawEntriesTable = (props: RawEntriesTableProps) => {
  const rawSchema = useLiveQuery(
    () => db.rawSchemas.get(props.rawSchemaId),
    [props.rawSchemaId]
  );
  const rawEntries = useLiveQuery(
    () =>
      db.rawEntries.where("rawSchemaId").equals(props.rawSchemaId).toArray(),
    [props.rawSchemaId]
  );

  return (
    <CellGrid
      headers={Object.keys(rawSchema?.schema ?? {})}
      entries={rawEntries?.map((entry) => entry.data) ?? []}
    />
  );
};
