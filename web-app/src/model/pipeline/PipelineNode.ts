import { FieldDataType } from "../../db/entries";

export type FieldValueMapperPipelineNode = {
  type: "field_mapper";
  fields: string[];
  acceptedTypes: FieldDataType[];
  inputNode: PipelineNodeId;
  outputNode: PipelineNodeId;
};

export type StripHtmlPipelineNode = FieldValueMapperPipelineNode & {
  acceptedTypes: ["string"];
};

export type TrimSpacesPipelineNode = FieldValueMapperPipelineNode & {
  acceptedTypes: ["string"];
};

export type PipelineNodeId = string;

export type PipelineNode = {
  Id: PipelineNodeId;
} & (StripHtmlPipelineNode | TrimSpacesPipelineNode);
