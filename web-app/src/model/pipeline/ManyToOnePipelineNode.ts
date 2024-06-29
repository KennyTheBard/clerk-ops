import { BasePipelineNode, PipelineNodeId } from "./BasePipelineNode";

export type ManyToOnePipelineNode<
  MinInputCount extends number,
  MaxInputCount extends number,
> = BasePipelineNode<"many_to_one", PipelineNodeId, PipelineNodeId> & {
  minInputCount: MinInputCount;
  maxInputCount: MaxInputCount;
};