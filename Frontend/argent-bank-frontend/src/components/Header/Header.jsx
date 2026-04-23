import { Link } from 'react-router-dom'
import logo from '../../assets/argentBankLogo.png'
import { useSelector } from "react-redux"

function Header() {
  const token = useSelector((state) => state.user.token)
  const user = useSelector((state) => state.user.user)

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        <Link className="main-nav-item" 
        to={token ? "/profile" : "/sign-in"}
        >

          <i className="fa fa-user-circle"></i>

          {token ? (
            <span>{user?.userName}</span>
          ) : (
            <span>Sign In</span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Header