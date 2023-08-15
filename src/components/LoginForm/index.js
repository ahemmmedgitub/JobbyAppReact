import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const apiStatuesConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    errorMsgStatues: false,
  }

  getUserName = event => {
    this.setState({username: event.target.value})
  }

  getUserPassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessfulLogin = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()

    const {password, username} = this.state

    const userDetails = {
      username,
      password,
    }

    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSuccessfulLogin(data.jwt_token)
    } else {
      this.setState({
        errorMsgStatues: true,
        errorMessage: data.error_msg,
      })
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {errorMsgStatues, errorMessage} = this.state

    return (
      <div className="log-in-form-main-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="app-logo"
          />
          <form onSubmit={this.onSubmitUserDetails} className="form-container">
            <label htmlFor="userName" className="label-element">
              USERNAME
            </label>
            <input
              className="input-element"
              type="text"
              placeholder="Username"
              id="userName"
              onChange={this.getUserName}
            />

            <label htmlFor="password" className="label-element">
              PASSWORD
            </label>
            <input
              className="input-element pass-input"
              type="password"
              placeholder="Password"
              id="password"
              onChange={this.getUserPassword}
            />
            {errorMsgStatues && <p className="error-msg">{errorMessage}</p>}
            <button type="submit" className="log-in-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
