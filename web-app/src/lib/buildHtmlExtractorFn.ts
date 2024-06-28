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

    if (
      !props.entries.rowsQuerySelector ||
      !props.entries.cellsQuerySelector
    ) {
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
      for (const index in valueElements) {
        if (!headers[index]) {
          headers[index] = `field_${index + 1}`;
        }
        const fieldName = headers[index];
        row[fieldName] = props.entries.stripHtml
          ? valueElements[index].textContent ?? ""
          : valueElements[index].innerHTML;
        if (props.entries.trimSpaces) {
          row[fieldName] = trimSpaces(row[fieldName]);
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
    .map((e) => (headersProps.stripHtml ? e.textContent ?? "" : e.innerHTML))
    .map((e) => (headersProps.trimSpaces ? trimSpaces(e) : e));
};

const trimSpaces = (s: string): string => s.replace(/\s+/g, " ").trim();
