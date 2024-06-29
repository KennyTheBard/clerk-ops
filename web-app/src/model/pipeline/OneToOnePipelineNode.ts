import { BasePipelineNode, PipelineNodeId } from "./BasePipelineNode";
import { FieldDataType } from "../../db/entries";

export type BaseOneToOnePipelineNode = BasePipelineNode<
  "one_to_one",
  PipelineNodeId,
  PipelineNodeId
>;

export type FieldValueMapperPipelineNode<
  AcceptedTypes extends Array<FieldDataType>,
> = BaseOneToOnePipelineNode & {
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

export type OneToOnePipelineNode =
  | StripHtmlPipelineNode
  | TrimSpacesPipelineNode;
