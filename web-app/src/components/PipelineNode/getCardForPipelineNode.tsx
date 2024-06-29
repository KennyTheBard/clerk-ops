import { ReactNode } from "react";
import { PipelineNode } from "../../model";
import { StripHtmlCard, TrimSpacesCard } from "./processing";

export const getCardForPipelineNode = (node: PipelineNode): ReactNode => {
  switch (node.base) {
    case "one_to_one":
      switch (node.type) {
        case "field_mapper":
          switch (node.subtype) {
            case "strip_html":
              return <StripHtmlCard />;
            case "trim_spaces":
              return <TrimSpacesCard />;
            default:
              throw new Error("Not implemented");
          }
        default:
          throw new Error("Not implemented");
      }
    default:
      throw new Error("Not implemented");
  }
};
