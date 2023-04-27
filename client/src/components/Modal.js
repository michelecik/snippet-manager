import { useState } from 'react';
import Editor from 'react-simple-code-editor'
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css";


const Modal = (props) => {

    const [title, setTitle] = useState('')
    const [code, setCode] = useState('')

    return (
        <div className="modal__backdrop">
            <div className="modal">
                <input className='modal__titleInput' type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <div className='snippet__codebox'>
                    <Editor
                        className='snippet__code'
                        textareaClassName="snippet__textarea"
                        value={code}
                        onValueChange={code => { setCode(code); }}
                        highlight={(code) => highlight(code, languages.js, "python")}
                        padding={0}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 14,
                        }}
                    />
                </div>

                <div onClick={() => props.onTest({ code, title })} className='modal__btn'>
                    Pubblica Snippet
                </div>
            </div>
        </div>
    )
}

export default Modal