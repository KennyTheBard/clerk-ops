import { db } from "../init";
import { FieldSchema, Id, RawSchema } from "../entries";

export const createRawSchema = (args: {
  name: string;
  schema: Record<string, FieldSchema>;
}): Promise<Id> => {
  return db.rawSchemas.add({
    name: args.name,
    createdAt: new Date(),
    schema: args.schema,
  });
};

export const getRawSchemaById = (rawSchemaId: Id): Promise<RawSchema | undefined> => {
  return db.rawSchemas.get(rawSchemaId);
};

export const getAllRawSchemas = (): Promise<RawSchema[]> => {
  return db.rawSchemas.toArray();
};
