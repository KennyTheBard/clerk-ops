import { db } from "../init";
import { FieldSchema, Id, RawEntryDataType } from "../entries";

export const createRawSchema = (args: { name: string, schema: Record<string, FieldSchema> }): Promise<Id> => {
  return db.rawSchemas.add({
    name: args.name,
    createdAt: new Date(),
    schema: args.schema,
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
