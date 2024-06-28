import { Dexie, type EntityTable } from "dexie";
import { RawSchema, RawEntry, ProcessingPipeline, ExtractionPipeline } from "./entries";

export const db = new Dexie("ClerkOpsDatabase") as Dexie & {
  rawSchemas: EntityTable<RawSchema, "id">;
  rawEntries: EntityTable<RawEntry, "id">;
  processingPipelines: EntityTable<ProcessingPipeline, "id">;
  extractionPipelines: EntityTable<ExtractionPipeline, "id">;
};

db.version(1).stores({
  rawSchemas: "++id, name, createdAt, schema",
  rawEntries: "++id, data, createdAt, rawSchemaId",
  processingPipelines: "++id, name, createdAt, inputSchemas, outputSchemas, nodes",
  extractionPipelines: "++id, data, createdAt, outputSchema, nodes",
});
// append upgrades to newer versions here
