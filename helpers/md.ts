import MarkdownIt from "markdown-it";
import MarkdownItAttrs from "markdown-it-attrs";
import TurndownService from "turndown";

const md = new MarkdownIt();
md.use(MarkdownItAttrs, {
  leftDelimiter: "{",
  rightDelimiter: "}",
  allowedAttributes: []
});

const html = new TurndownService();

// text param its an innerHTML or MD text, however its works.
export function MDtoHTML(text: string) {
  // const result = text.split("\n\n").map(e => e+"{contenteditable=\"true\"}").join("\n\n");
  // console.log(result);
  return md.render(text);
}

export function HTMLtoMD(text: string) {
  return html.turndown(text);
}

const parser = {
  MDtoHTML, HTMLtoMD
};

export default parser;