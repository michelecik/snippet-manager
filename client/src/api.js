import axios from 'axios'

const BASE_URL = 'http://localhost:8000/'

const API = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

const TOKEN = window.localStorage['snippet_token'] ?? null

if (TOKEN) {
    API.defaults.headers.common['Authorization'] = 'Token ' + TOKEN
}

// API.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             window.location.replace('/login')
//         }
//         return Promise.reject(error)
//     }
// )

API.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const setToken = (data) => {
    console.log(data)
    window.localStorage.setItem('snippet_token', data.token)
    window.localStorage.setItem('snippet_user', JSON.stringify(data.user))
    API.defaults.headers.common['Authorization'] = 'Token ' + data.token
}

const auth = {
    register: async (data) => {
        const res = await API.post(BASE_URL + 'api/auth/register', data)
        setToken(res.data)
        return res
    },
    login: async (data) => {
        const res = await API.post(BASE_URL + 'api/auth/login', data)
        setToken(res.data)
        return res
    }
}

const users = {
    getOne: async (id) => {
        const res = await API.post(BASE_URL + 'api/users/' + id)
        console.log(res)
    }
}

const snippets = {
    getAll: async (data) => {
        const res = await API.get(BASE_URL + "snippets")
        // console.log(res)
        return res
    },
    getOne: async (id) => {
        const res = await API.get(BASE_URL + 'snippets/' + id)
        return res
    },
    addOne: async (data) => {
        console.log(data)
        const res = await API.post(BASE_URL + 'snippets/', {
            title: data.title,
            code: data.code
        })
    },
    deleteOne: async (id) => {
        const res = await API.delete(BASE_URL + 'snippets/' + id).catch(err => {
            return res
        })
        return res
    },
    editOne: async (id, data) => {
        const res = await API.patch(BASE_URL + `snippets/${id}/`, { code: data.code, title: data.title })
        return res
    }
}


export default { snippets, users, auth }