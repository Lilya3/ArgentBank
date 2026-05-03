import { Link } from 'react-router-dom'
import logo from '../../../public/img/argentBankLogo.png'
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { logout } from '../../store/userSlice'
import { useNavigate } from 'react-router-dom'


function Header() {
  const token = useSelector((state) => state.user.token)
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <nav className="header">
      <Link className="header__logo" to="/">
        <img
          className="header__logo-img"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <nav className="header__nav">

        {token ? (
          <>
            <Link className='header__link' to="/profile">
              <i className='fa fa-user-circle'></i>
              <span>{user?.userName}</span>
            </Link>

            <button 
            type="button" 
            className='header__link' 
            onClick={handleLogout}>
              <i className='fa fa-sign-out'></i>
              Sign Out
            </button>
          </>
        ) : (
          <Link className='header__link' to="/sign-in">
            <i className='fa fa-user-circle'></i>
            <span>Sign In</span>
          </Link>
        )}

      </nav>
    </nav>
  )
}

export default Header