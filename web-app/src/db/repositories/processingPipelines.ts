import { Id, ProcessingPipeline } from "../entries";
import { db } from "../init";


export const createProcessingPipeline = (args: {
  name: string;
}): Promise<Id> => {
  return db.processingPipelines.add({
    name: args.name,
    createdAt: new Date(),
    inputSchemas: [],
    outputSchemas: [],
    pipeline: {},
  });
};

export const getAllProcessingPipelines = (): Promise<ProcessingPipeline[]> => {
  return db.processingPipelines.toArray();
};
