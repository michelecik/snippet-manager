import { useState, useEffect } from 'react'
import api from '../api'
import Snippet from '../components/Snippet'
import AddSnippet from '../components/AddSnippet'
import Modal from '../components/Modal'

const AllSnippets = () => {
    const [snippets, setSnippets] = useState([])

    const [snippetModal, setSnippetModal] = useState(false)
    const getSnippets = async () => {
        const snippetsFromServer = await api.snippets.getAll()
        setSnippets(snippetsFromServer.data.results)
    }

    useEffect(() => {
        getSnippets()
    }, [])

    const deleteSnippet = async (id) => {
        const res = await api.snippets.deleteOne(id)
        if(res.status == 204) {
            setSnippets(snippets.filter(snippet => snippet.id !== id))
        }
        await getSnippets()
    }
    

    const addSnippet = async (data) => {
        setSnippetModal(false)
        const res = await api.snippets.addOne(data)
        getSnippets()
    }

    return (
        <>
            {snippetModal ? <Modal onTest={(data) => addSnippet(data)} /> : null}

            <div className='snipsWrapper'>
                {snippets[0] ? snippets.map(snip => (
                    <Snippet key={snip.id} onDelete={deleteSnippet} snippet={snip} />
                )) : <p>No snippets</p>}
            </div>

            <AddSnippet onOpen={() => { setSnippetModal(true) }}></AddSnippet>
        </>
    )
}

export default AllSnippets