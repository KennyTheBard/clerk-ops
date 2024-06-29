import { stripHtmlFn, trimSpacesFn } from "./textManipulation";

export type HtmlExtractorFnProps = {
  headers: {
    querySelector: string;
    stripHtml: boolean;
    trimSpaces: boolean;
  };
  entries: {
    rowsQuerySelector: string;
    cellsQuerySelector: string;
    stripHtml: boolean;
    trimSpaces: boolean;
  };
};

export type HtmlExtractorFnReturn = {
  headers: string[];
  rows: Record<string, string>[];
};

export const buildHtmlExtractorFn =
  (props: HtmlExtractorFnProps) =>
  (content: string): HtmlExtractorFnReturn => {
    const parser = new DOMParser();
    const document = parser.parseFromString(content, "text/html");
    const headers = getHeaders(document, props.headers);

    if (!props.entries.rowsQuerySelector || !props.entries.cellsQuerySelector) {
      return {
        headers: [],
        rows: [],
      };
    }
    const rowElements = Array.from(
      document.querySelectorAll(props.entries.rowsQuerySelector)
    );
    const rows = [];
    for (const rowElement of rowElements) {
      const valueElements = Array.from(
        rowElement.querySelectorAll(props.entries.cellsQuerySelector)
      );
      const row: Record<string, string> = {};
      for (let index = 0; index < valueElements.length; index++) {
        if (!headers[index]) {
          headers[index] = getDefaultHeaderName(index);
        }
        const fieldName = headers[index];
        row[fieldName] = valueElements[index].innerHTML;
        if (props.entries.stripHtml) {
          row[fieldName] = stripHtmlFn(valueElements[index].innerHTML);
        }
        if (props.entries.trimSpaces) {
          row[fieldName] = trimSpacesFn(row[fieldName]);
        }
      }
      rows.push(row);
    }
    return {
      headers,
      rows,
    };
  };

const getHeaders = (
  document: Document,
  headersProps: HtmlExtractorFnProps["headers"]
): string[] => {
  if (!headersProps.querySelector) {
    return [];
  }
  const headerElements = Array.from(
    document.querySelectorAll(headersProps.querySelector)
  );
  return headerElements
    .map((element) => element.innerHTML)
    .map((header) => (headersProps.stripHtml ? stripHtmlFn(header) : header))
    .map((header) => (headersProps.trimSpaces ? trimSpacesFn(header) : header))
    .map((header, index) =>
      !!header?.length ? header : getDefaultHeaderName(index)
    );
};

const getDefaultHeaderName = (index: number): string => `field_${index + 1}`;
