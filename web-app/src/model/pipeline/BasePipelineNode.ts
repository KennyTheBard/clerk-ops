// TODO: use branded type
export type PipelineNodeId = string;

export type BasePipelineNode<BaseType, InputType, OutputType> = {
  id: PipelineNodeId;
  base: BaseType;
  input: InputType | undefined;
  output: OutputType | undefined;
};
