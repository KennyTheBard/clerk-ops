import { BasePipelineNode, PipelineNodeId } from "./BasePipelineNode";

export type ManyToManyPipelineNode<
  MinOutputCount extends number,
  MaxOutputCount extends number,
  MinInputCount extends number,
  MaxInputCount extends number,
> = BasePipelineNode<"many-to-many", PipelineNodeId, PipelineNodeId> & {
  minOutputCount: MinOutputCount;
  maxOutputCount: MaxOutputCount;
  minInputCount: MinInputCount;
  maxInputCount: MaxInputCount;
};
