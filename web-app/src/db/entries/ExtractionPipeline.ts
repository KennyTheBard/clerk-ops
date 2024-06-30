import { Id } from "./utils";

// TODO: leave this aside for now
export type ExtractionPipeline = {
  id: Id;
  name: string;
  outputSchema: Id;
  nodes: Object[]; // TODO: define a proper type
  createdAt: Date;
  // TODO: uncomment when support will be there for this
  // domain: string;
  // url: string;
};
