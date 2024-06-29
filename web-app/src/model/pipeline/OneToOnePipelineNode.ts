import { BasePipelineNode, PipelineNodeId } from "./BasePipelineNode";
import { FieldDataType } from "../../db/entries";

export type OneToOnePipelineNode = BasePipelineNode<
  "one-to-one",
  PipelineNodeId,
  PipelineNodeId
>;

export type FieldValueMapperPipelineNode<
  AcceptedTypes extends Array<FieldDataType>,
> = OneToOnePipelineNode & {
  type: "field_mapper";
  fields: string[];
  acceptedTypes: AcceptedTypes;
};

export type StripHtmlPipelineNode = FieldValueMapperPipelineNode<["string"]> & {
  subtype: "strip_html";
};

export type TrimSpacesPipelineNode = FieldValueMapperPipelineNode<
  ["string"]
> & {
  subtype: "trim_spaces";
};

export type OneToOnePipelineNodes =
  | StripHtmlPipelineNode
  | TrimSpacesPipelineNode;
