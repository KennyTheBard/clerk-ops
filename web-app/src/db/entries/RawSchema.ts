import { Id } from "./utils";

export type RawSchema = {
  id: Id;
  name: string;
  createdAt: Date;
  // TODO: uncomment and handle this after the basic flow is there
  // domain: string;
  // schema: Record<string, FieldSchema>;
  // url: string;
};


export type FieldDataType = 'string' | 'number' | 'bool';

export type FieldSchema = {
  type: FieldDataType;
  required: boolean;
};