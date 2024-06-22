export type HtmlExtractorFnProps = {
  headersQuerySelector: string;
  rowsQuerySelector: string;
  columnsQuerySelector: string;
};

export type HtmlExtractorFnReturn = {
  headers: string[];
  rows: Record<string, string>[];
}

export const buildHtmlExtractorFn =
  ({
    headersQuerySelector,
    rowsQuerySelector,
    columnsQuerySelector,
  }: HtmlExtractorFnProps) =>
  (content: string): HtmlExtractorFnReturn => {
    const parser = new DOMParser();
    const document = parser.parseFromString(content, "text/html");
    const headers = getHeaders(document, headersQuerySelector);

    if (!rowsQuerySelector || !columnsQuerySelector) {
      return {
        headers: [],
        rows: [],
      };
    }
    const rowElements = Array.from(
      document.querySelectorAll(rowsQuerySelector)
    );
    const rows = [];
    for (const rowElement of rowElements) {
      const valueElements = Array.from(
        rowElement.querySelectorAll(columnsQuerySelector)
      );
      const row: Record<string, string> = {};
      for (const index in valueElements) {
        if (!headers[index]) {
          headers[index] = `field_${index + 1}`;
        }
        const fieldName = headers[index];
        row[fieldName] = valueElements[index].innerHTML;
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
  headersQuerySelector: string
): string[] => {
  if (!headersQuerySelector) {
    return [];
  }
  const headerElements = Array.from(
    document.querySelectorAll(headersQuerySelector)
  );
  return headerElements.map((e) => e.innerHTML);
};
