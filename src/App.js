import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import './App.scss';

function App() {
  const [HTML, setHTML] = useState("");
  const [CSS, setCSS] = useState("");
  const [JS, setJS] = useState("");
  const [active, setActive] = useState("HTML");

  const handleChange = (tabval) => {
    setActive(tabval);
  }

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        alert("Code copied to clipboard!");
      })
      .catch((error) => {
        console.error("Copy to clipboard failed: ", error);
      });
  }
  const [lock, setLock] = useState(false);
  const saveCode = () => {
    const code = {
      html: HTML,
      css: CSS,
      js: JS,
    };
    const codeText = JSON.stringify(code);
    const fileName = "myCode.txt";
    const blob = new Blob([codeText], {
      type: "text/plain", 
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  
    window.URL.revokeObjectURL(url);
  };
  const frame = `
    <html>
      <head>
        <style>
          ${CSS}
        </style>
      </head>

      <body>
        ${HTML}

        <script> 
          ${JS}
        </script>
      </body>
    </html>
  `;

  return (
    <div className='mainbox'>
      <div className='mainbox-one'>
        <div className='Techbox'>
          <div className='Techhead'>

            <button
              className={active === "HTML" ? "btn-active" : "btn"}
              onClick={() => handleChange("HTML")}
            >
              HTML
            </button>
            <button
              className={active === "CSS" ? "btn-active" : "btn"}
              onClick={() => handleChange("CSS")}
            >
              CSS
            </button>
            <button
              className={active === "JS" ? "btn-active" : "btn"}
              onClick={() => handleChange("JS")}
            >
              JS
            </button>
              <button
                className="btn" 
                onClick={() => copyToClipboard(frame)}
              >
                Copy
              </button>
              <button className="btn" onClick={saveCode}>
                save
              </button>
              <button className='btn' onClick={() => setLock(!lock)}>
                {lock === true ? "unlock" : "lock"}
              </button>
              <div className={lock === true ? "lock-bar" : "lock-bar-open"}>
                {lock === true ? " locked" : "OPEN"}
              </div>
          </div>
          <div className='Techeditor'>
            <div className='editor'>
            {active === "HTML" && (
              <Editor
              height="90vh"
                width="80vh"
                defaultLanguage="html"
                defaultValue={HTML}
                onChange={(value, e) => setHTML(value)}
                options={{readOnly: lock}}
              />
            )}
            {active === "CSS" && (
              <Editor
                height="50vh"
                width="95vh"
                defaultLanguage="css"
                defaultValue={CSS}
                onChange={(value, e) => setCSS(value)}
                options={{readOnly: lock}} 
              />
            )}
            {active === "JS" && (
              <Editor
                height="50vh"
                width="95vh"
                defaultLanguage="javascript"
                defaultValue={JS}
                onChange={(value, e) => setJS(value)}
                options={{readOnly: lock}} 
              />
            )}
            </div>
          </div>
        </div>
      </div>
      <div className='resultbox'>
        <iframe className='frames' height={"97%"} width={"95%"} srcDoc={frame} />
      </div>
    </div>
  );
}

export default App;
