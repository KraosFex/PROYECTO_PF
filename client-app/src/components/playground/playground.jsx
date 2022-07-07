import { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { sublime } from '@uiw/codemirror-theme-sublime';
import style from './playground.module.css';


function Playground() {

    const [iframe, setIframe] = useState();
    const [htmlCode, setHtmlCode] = useState();


    const onChange = (value, type) => {

        if(type === "html") {
            setHtmlCode(value)
            iframe.contentDocument.body.innerHTML = htmlCode;
        }
        else if(type === "css") {
            let body = `
            body {
                margin: 0;
            }


            `
            let cssCode = "<style>"+body+value+"</style>"
            iframe.contentDocument.body.innerHTML = htmlCode+cssCode;
        }

    }

    useEffect(() => {

        let myIframe = document.getElementById("output")
        setIframe(myIframe)
    
    }, []);

    return (
        <div className={style.topContainer}>

            <div className={style.codeEditorsContainer}>

            
                    
                        <label>HTML</label>
                        <CodeMirror   
                        className={style.codeEditor} 
                        height='39.78vh'        
                        value=""
                        extensions={[html()]}
                        theme={sublime}
                        onChange={(value) => onChange(value, "html")}
                        />
               
                   

               
               
                    
                
                        <label>CSS</label>
                        <CodeMirror 
                        className={style.codeEditor}    
                        height='39.78vh'    
                        value=""
                        extensions={[css()]}
                        theme={sublime}
                        onChange={(value) => onChange(value, "css")}
                        />
               
                   

              
                
            </div>

            <div className={style.iframeContainer}>

                 <iframe id="output" />

            </div>
        </div>
      
    )
}

export default Playground;