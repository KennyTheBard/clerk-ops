import { Id } from "./utils";


export type RawEntry = {
    id: Id;
    data: RawEntryDataType;
    rawSchemaId: Id;
    createdAt: Date;
}

export type RawEntryDataType = Record<string, any>;