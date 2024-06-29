import { Id } from "./utils";

export type RawSchema = {
  id: Id;
  name: string;
  createdAt: Date;
  schema: Record<string, FieldSchema>;
  // TODO: uncomment and handle this after the basic flow is there
  // domain: string;
  // url: string;
};


export type FieldDataType = 'string' | 'number' | 'bool' | 'date';

export type FieldSchema = {
  type: FieldDataType;
  required: boolean;
  index: number;
};