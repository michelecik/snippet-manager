import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async (e) => {
    e.preventDefault()
    let res = await api.auth.login({ username, password })
    if(res.status == 200) {
      navigate('/')
    }
  }


  return (
    <div className='login__wrapper'>
      <form className='login__form' onSubmit={(e) => login(e)}>
        <h1>Login</h1>
        <div className='login__input'>
          <label htmlFor="username">
            Username
          </label>
          <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
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

export default Login