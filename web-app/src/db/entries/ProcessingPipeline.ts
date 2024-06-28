import { PipelineNode } from "../../model";
import { Id } from "./utils";

export type ProcessingPipeline = {
    id: Id;
    name: string;
    inputSchemas: Id[];
    outputSchemas: Id[];
    nodes: PipelineNode[]; // TODO: define a proper type
    createdAt: Date;
}
