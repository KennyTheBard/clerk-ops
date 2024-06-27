import { db } from "../init";
import { Id, RawEntryDataType } from "../entries";

export const createRawSchema = (args: { name: string }): Promise<Id> => {
  return db.rawSchemas.add({
    name: args.name,
    createdAt: new Date(),
  });
};

export const insertBulkRawEntry = (args: {
  entries: RawEntryDataType[];
  rawSchemaId: Id;
}): Promise<Id> => {
  const now = new Date();
  return db.rawEntries.bulkAdd(
    args.entries.map((entry) => ({
      data: entry,
      rawSchemaId: args.rawSchemaId,
      createdAt: now,
    }))
  );
};
