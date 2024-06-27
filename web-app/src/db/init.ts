import { Dexie, type EntityTable } from "dexie";
import { RawSchema, RawEntry } from "./entries";

export const db = new Dexie("ClerkOpsDatabase") as Dexie & {
  rawSchemas: EntityTable<RawSchema, "id">;
  rawEntries: EntityTable<RawEntry, "id">;
};

db.version(1).stores({
  rawSchemas: "++id, name, createdAt, schema",
  rawEntries: "++id, data, createdAt, rawSchemaId",
});
// append upgrades to newer versions here
