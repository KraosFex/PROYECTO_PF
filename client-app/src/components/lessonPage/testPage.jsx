import { useState } from 'react'
import Editor from "@monaco-editor/react";

// style
import style from './testPage.module.css';

const files = {
  "script.js": {
    name: "script.js",
    language: "javascript",
    value: 
    `//someJSCodeExample
        const add = (a,b) => a + b;
    module.exports = {add};
`}
}

function TestPage() {
  
  const [fileName, setFileName] = useState("script.js");

  const file = files[fileName];

  const [code, setCode] = useState(file.value)

  const handleValue = e => {
    setCode(e)
  }

  const submitCode =  () => {    
      alert(code)
  }

  return (
    <>
      <button disabled={fileName === "script.js"} onClick={() => setFileName("script.js")}>script.js</button>
      <div className={style.Editor}>
        <Editor
            width="950px"
            height="750px"
            theme="vs-dark"
            path={file.name}
            defaultLanguage={file.language}
            defaultValue={code}
            onChange={handleValue}
        />
      </div>
      <button onClick={submitCode}>test</button>
    </>
  );
}

export default TestPage;
