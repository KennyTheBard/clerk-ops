import { BasePipelineNode, PipelineNodeId } from "./BasePipelineNode";

export type ManyToOnePipelineNode<
  MinInputCount extends number,
  MaxInputCount extends number,
> = BasePipelineNode<"many-to-one", PipelineNodeId, PipelineNodeId> & {
  minInputCount: MinInputCount;
  maxInputCount: MaxInputCount;
};