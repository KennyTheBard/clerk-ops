import * as prettier from 'prettier';
import * as parserHtml from 'prettier/parser-html';

export const prettifyHtml = async (htmlString: string): Promise<string> => {
  return prettier.format(htmlString, {
    parser: 'html',
    printWidth: 140,
    htmlWhitespaceSensitivity: "ignore",
    plugins: [parserHtml],
  });
};