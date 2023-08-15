import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {RiHandbagLine} from 'react-icons/ri'
import {IoIosLogOut} from 'react-icons/io'
import {AiOutlineHome} from 'react-icons/ai'

import './index.css'

const Header = props => {
  const onClickLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <ul className="desk-top-view">
        <Link to="/" className="link-elements">
          <li className="link-elements">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="web-logo"
            />
          </li>
        </Link>
        <li className="home-job-container link-elements">
          <Link to="/" className="link-elements">
            <p className="path-elements">Home</p>
          </Link>
          <Link to="/jobs" className="link-elements">
            <p className="path-elements">Jobs</p>
          </Link>
        </li>
        <li className="link-elements">
          <button
            type="button"
            className="log-out-btn"
            onClick={onClickLogoutBtn}
          >
            Logout
          </button>
        </li>
      </ul>

      <div className="mobile-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="web-logo"
        />
        <ul className="icons-container">
          <li className="link-elements">
            <AiOutlineHome className="log-out-icon home" />
          </li>
          <li className="link-elements">
            <RiHandbagLine className="log-out-icon home" />
          </li>
          <li className="link-elements">
            <IoIosLogOut className="log-out-icon" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Header)
