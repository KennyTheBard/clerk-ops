import { Pipeline } from "../../model";
import { Id } from "./utils";

export type ProcessingPipeline = {
    id: Id;
    name: string;
    inputSchemas: Id[];
    outputSchemas: Id[];
    pipeline: Pipeline; // TODO: define a proper type
    createdAt: Date;
}
