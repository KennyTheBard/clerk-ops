import { stripHtml } from "string-strip-html";

export const stripHtmlFn = (content: string): string =>
  stripHtml(content).result;
