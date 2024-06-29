import { PipelineNodeId } from "./BasePipelineNode";
import { OneToOnePipelineNode } from "./OneToOnePipelineNode";

export type PipelineNode = OneToOnePipelineNode;

export type Pipeline = Record<PipelineNodeId, PipelineNode>;
