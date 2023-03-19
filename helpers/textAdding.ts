// Adding text to editor
interface I {
  current: HTMLElement;
}
export function addParagraph(editor: I) {
  if(!editor) return;
  if(!editor.current) return;

  const current = editor.current;
  const p = document.createElement("p");
  p.innerText = "New Paragraph";
  p.contentEditable = "true";
  current.append(p);
}

export function addElement(editor: I, element: string) {
  if(!editor) return;
  if(!editor.current) return;

  const current = editor.current;
  const elem = document.createElement(element);
  elem.innerText = "New Paragraph";
  elem.contentEditable = "true";
  elem.style.display = "block";
  current.append(elem);
}


const text = {
  addParagraph,
  addElement
};
export default text;