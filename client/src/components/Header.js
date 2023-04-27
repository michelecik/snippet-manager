import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="header">
        <h1>CodeSnipt</h1>

        <nav className="header__menu">
          <Link className="header__menu-item" to='/'>All Snippets</Link>
          <Link className="header__menu-item" to='/profile'>Profile</Link>
          <Link className="header__menu-item" to='/login'>LogIn</Link>
          <Link className="header__menu-item" to='/register'>Register</Link>
        </nav>
    </header>
  )
}

export default Header