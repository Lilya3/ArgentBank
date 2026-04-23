import { Link } from 'react-router-dom'
import logo from '../../assets/argentBankLogo.png'
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

        {token ? (
          <>
            <Link className='main-nav-item' to="/profile">
              <i className='fa fa-user-circle'></i>
              <span>{user?.userName}</span>
            </Link>

            <button 
            type="button" 
            className='main-nav-item' 
            onClick={handleLogout}>
              <i className='fa fa-sign-out'></i>
              Sign Out
            </button>
          </>
        ) : (
          <Link className='main-nav-item' to="/sign-in">
            <i className='fa fa-user-circle'></i>
            <span>Sign In</span>
          </Link>
        )}

      </div>
    </nav>
  )
}

export default Header