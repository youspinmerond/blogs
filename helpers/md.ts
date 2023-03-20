import MarkdownIt from "markdown-it";
import TurndownService from "turndown";

const md = new MarkdownIt();
const html = new TurndownService();

// text param its an innerHTML or MD text, however its works.
export function MDtoHTML(text: string) {
  return md.render(text);
}

export function HTMLtoMD(text: string) {
  return html.turndown(text);
}

const parser = {
  MDtoHTML, HTMLtoMD
};

export default parser;