import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {HiHome} from 'react-icons/hi'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onLogoutClick = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="header-logo"
          alt="website logo"
        />
      </Link>
      <ul className="nav-items-container">
        <Link to="/" className="nav-items">
          <li className="nav-list-items">
            <p>Home</p>
          </li>
        </Link>
        <Link to="/jobs" className="nav-items">
          <li className="nav-list-items">
            <p>Jobs</p>
          </li>
        </Link>
      </ul>
      <div className="nav-logout-container">
        <button type="button" className="logout-button" onClick={onLogoutClick}>
          Logout
        </button>
      </div>
      <ul className="nav-items-for-small-devices">
        <Link to="/" className="nav-icons-link">
          <li className="header-list-items">
            <HiHome />
          </li>
        </Link>
        <Link to="/jobs" className="nav-icons-link">
          <li className="header-list-items">
            <BsBriefcaseFill />
          </li>
        </Link>

        <li className="header-list-items">
          <button
            type="button"
            className="nav-icons-link"
            onClick={onLogoutClick}
          >
            <FiLogOut />
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
