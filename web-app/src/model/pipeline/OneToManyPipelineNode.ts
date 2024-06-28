import { BasePipelineNode, PipelineNodeId } from "./BasePipelineNode";

export type OneToManyPipelineNode<
  MinOutputCount extends number,
  MaxOutputCount extends number,
> = BasePipelineNode<"one-to-many", PipelineNodeId, PipelineNodeId[]> & {
  minOutputCount: MinOutputCount;
  maxOutputCount: MaxOutputCount;
};
