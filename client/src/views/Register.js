import { useState } from "react"
import api from "../api"
import { navigate, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [alert, setAlert] = useState({})

    const register = async (e) => {
        e.preventDefault()
        let res = await api.auth.register({ username, email, password })
        if(res.status == 200) {
            navigate('/')
        }
    }

    return (
        <div className='login__wrapper'>
            {alert.visible ? <div className="alert">
                <h2>{alert.title}</h2>
                <p>{alert.text}</p>
            </div> : null }
            <form className='login__form' onSubmit={(e) => register(e)}>
                <h1>Register</h1>
                <div className='login__input'>
                    <label htmlFor="username">
                        Username
                    </label>
                    <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className='login__input'>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='login__input'>
                    <label htmlFor="password">Password</label>
                    <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div>
                    <input className="login__input" type="submit" value='Invia' />
                </div>

            </form>
        </div>
    )
}

export default Register