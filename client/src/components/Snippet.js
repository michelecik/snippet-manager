import { useCallback, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import api from '../api'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css";

const Snippet = (props) => {

    // const deleteSnippet = async (id) => {
    //     api.snippets.deleteOne(id)
    // }

    const [editMode, setEditMode] = useState(false)
    const [code, setCode] = useState(props.snippet.code)

    const saveSnippet = async (id) => {
        api.snippets.editOne(id, { code, title })
        setEditMode(false)
        setTitleEditMode(false)
    }

    const [title, setTitle] = useState(props.snippet.title)

    const [titleEditMode, setTitleEditMode] = useState(false)

    const [isLarge, setIsLarge] = useState(false)

    const editTitle = (id) => {
        setTitleEditMode(true)
    }

    const isLargeStyling = {
        width: isLarge ? '100%' : null
    }

    return (
        <div className='snippet' style={isLargeStyling} key={props.snippet.id}>
            <p className="snippet__owner">{props.snippet.owner}</p>
            <div>
                {
                    titleEditMode ?
                        <input onBlur={() => saveSnippet(props.snippet.id)} type='text' value={title} onKeyDown={(e) => e.key == 'Enter' ? saveSnippet(props.snippet.id) : null} onChange={(e) => setTitle(e.target.value)} /> :
                        <h3 onClick={() => editTitle(props.snippet.id)} className='snippet__title'>{title}</h3>
                }
            </div>
            <div className='snippet__codebox'>
                <div className='snippet__options'>
                    <div onClick={() => setIsLarge(!isLarge)} className='snippet__option snippet__option--enlarge'></div>
                    <div onClick={() => props.onDelete(props.snippet.id)} className='snippet__option snippet__option--close'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div>
                    <Editor
                        className='snippet__code'
                        textareaClassName="snippet__textarea"
                        value={code}
                        onValueChange={code => { setCode(code); setEditMode(true) }}
                        highlight={(code) => highlight(code, languages.js, "python")}
                        padding={0}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 14,
                        }}
                    />
                    {editMode ? <div className='snippet__btn snippet__btn--save' onClick={() => saveSnippet(props.snippet.id, code)}>Save Snippet</div> : null}
                </div>
            </div>
        </div>
    )
}

export default Snippet