import styles from "../styles/createpost.module.sass";
import Input from "@/components/UI/Input/Input";
import Button from "@/components/UI/Button/Button";
import Menu from "@/components/UI/Menu/Menu";
import { addParagraph } from "@/helpers/textAdding";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { FormEvent } from "react";

export default function CreatePage() {
  const user = useSelector((state:any) => state).login;

  const [editor, setEditor] = useState<"visual" | "source">("visual");
  const visual = useRef<any>(null);

  const options: {id: number, symbol: string, value: string}[] = [
    {id: 1, symbol:"h1", value: "h1"},
    {id: 2, symbol:"h2", value: "h2"},
    {id: 3, symbol:"h3", value: "h3"},
    {id: 4, symbol:"b", value: "b"},
    {id: 5, symbol:"i", value: "i"},
    {id: 6, symbol:"m", value: "pre"},
    {id: 7, symbol:"d", value: "strike"},
    {id: 8, symbol:"u", value: "u"},
    {id: 10, symbol:"c", value: "span"}
  ];
  const [field, setField] = useState<
  {
    options: {id: number, symbol: string, value: string}[],
    coords:  {x: number, y: number},
  } | null>(null);

  function sub(e: FormEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string },
      body: { value: string }
    };

    const body = {
      title: target.title.value,
      body: target.body.value
    };
    
    fetch("http://localhost:3000/api/posts/create", {
      method: "POST",
      body: JSON.stringify({post: body, token: localStorage.getItem("token") })
    })
      .then(res => res.json())
      .then(res => {
        if(res.id) {
          location.href = "http://localhost:3000/article/"+res.id;
        }
      });
  }

  if(user === false) {
    return <section className={styles.section}><h1>You&apos;re not logged in.</h1></section>;
  } else {
    return (
      <>
        <section className={styles.section}>
          <Button disabled={editor === "visual"} onClick={() => setEditor("visual")}>
            Visual
          </Button>
          <Button disabled={editor === "source"} onClick={() => setEditor("source")}>
            Text
          </Button>
          <form onSubmit={(e: FormEvent) => sub(e)}>
            <Input placeholder="Title" name="title" required/>
            {
              editor === "visual"
                ?
                <div className={styles.textarea}>
                  <div className="text" ref={visual}>
                  </div>
                  <div className={styles.addParagraph}>
                    <div
                      className={styles.addParagraphLeft}
                      onClick={() => addParagraph(visual)}>
                      <div className={styles.addParagraphPlus}>+</div>
                      <div className="text">Add Paragraph</div>
                    </div>
                    <div className="right">
                      <Button
                        typeButton="button"
                        onClick={(e: MouseEvent) => setField({options: options, coords:{x: e.pageX, y: e.pageY}})}>
                          Something else
                      </Button>
                      {
                        field ? 
                          <Menu
                            options={field.options}
                            coords={field.coords}
                            editor={visual}
                            fieldState={setField}

                          />
                          : null
                      }
                    </div>
                  </div>
                </div>
                :
                <textarea
                  name="body"
                  className={styles.textarea}
                  placeholder="Body"
                  minLength={100}
                  style={
                    {
                      minWidth:"100%",
                      maxWidth:"100%",
                      minHeight:"25rem",
                      maxHeight:"25rem"
                    }
                  }>
                </textarea>
            }
            <div className={styles.right}>
              <Button typeButton="submit">Submit</Button>
            </div>
          </form>
        </section>
      </>
    );
  }
}