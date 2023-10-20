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
  //  this function helps to copy the code and iframe is being passed as a context to this
  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        alert("Code copied to clipboard!");
      })
      .catch((error) => {
        console.error("Copy to clipboard failed: ", error);
      });
  }
  //  this state is used for toggling the readyOnly property of the monaco editor 
  const [lock, setLock] = useState(false);
  //  this part of the code is used for saving the code as txt file in the local device
  const saveCode = () => {
    const code = {
      html: HTML,
      css: CSS,
      js: JS,
    };
    const codeText = JSON.stringify(code);
    const fileName = "Code.txt";
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
                COPY
              </button>
              <button className="btn" onClick={saveCode}>
                SAVE
              </button>
              <button className='btn' onClick={() => setLock(!lock)}>
                {lock === true ? "UNLOCK" : "LOCK"}
              </button>
              {/*  this div is being toggled such that  it will change its color and text according to the lock variable */}
              <div className={lock === true ? "lock-bar" : "lock-bar-open"}>
                {lock === true ? " LOCKED" : "OPEN"}
              </div>
          </div>
          <div className='Techeditor'>
            {/*  below are the three editors that are being shown as depending upon the value of active state */}
            <div className='editor'>
            {active === "HTML" && (
              <Editor
              height="90vh"
                width="90vh"
                defaultLanguage="html"
                defaultValue={HTML}
                onChange={(value, e) => setHTML(value)}
                //  below proprty is being used to lock and unlock the editor
                options={{readOnly: lock}} 
              />
            )}
            {active === "CSS" && (
              <Editor
                height="90vh"
                width="80vh"
                defaultLanguage="css"
                defaultValue={CSS}
                onChange={(value, e) => setCSS(value)}
                options={{readOnly: lock}} 
              />
            )}
            {active === "JS" && (
              <Editor
                height="90vh"
                width="80vh"
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
      {/* this is the final section where compiled code can be seen */}
      <div className='resultbox'>
        <iframe className='frames' height={"95%"} width={"95%"} srcDoc={frame} />
      </div>
    </div>
  );
}

export default App;
