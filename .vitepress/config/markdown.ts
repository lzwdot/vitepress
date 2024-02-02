import { MarkdownOptions } from 'vitepress';
import type Token from 'markdown-it/lib/token';
import container from 'markdown-it-container';

export default {
  config(md) {
    md.use(container, 'htmlDemo', {
      validate: function (params: string) {
        return params.toLowerCase().includes('html');
      },
      render: function (tokens: Array<Token>, idx: number) {
        return tokens[idx].nesting === 1 ? `<HtmlDemo>\n` : `</HtmlDemo>\n`;
      },
    });
    md.use(container, 'jsDemo', {
      validate: function (params: string) {
        return params.toLowerCase().includes('js');
      },
      render: function (tokens: Array<Token>, idx: number) {
        return tokens[idx].nesting === 1 ? `<JsDemo>\n` : `</JsDemo>\n`;
      },
    });
  },
} satisfies MarkdownOptions;
