import { db } from "../init";
import { Id, RawEntry, RawEntryDataType } from "../entries";

export const getRawEntriesBySchemaId = (rawSchemaId: Id): Promise<RawEntry[]> => {
  return db.rawEntries.where("rawSchemaId").equals(rawSchemaId).toArray();
};

export const insertBulkRawEntry = (args: {
  entries: RawEntryDataType[];
  rawSchemaId: Id;
}): Promise<Id> => {
  return db.rawEntries.bulkAdd(
    args.entries.map((entry) => ({
      data: entry,
      rawSchemaId: args.rawSchemaId,
      createdAt: new Date(),
    }))
  );
};
