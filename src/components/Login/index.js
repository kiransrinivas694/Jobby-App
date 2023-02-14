import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSuccessOf = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureOf = error => {
    this.setState({errorMsg: error})
  }

  onStatusCheck = errorMsg => {
    if (errorMsg.length > 0) {
      return true
    }
    return false
  }

  onSubmitClick = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccessOf(data.jwt_token)
    } else {
      this.onFailureOf(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-main-container">
        <div className="sample-credentials-container">
          <h1 className="sample-heading">Sample Credentials</h1>
          <p> Username : rahul</p>
          <p>Password : rahul@2021</p>
        </div>
        <form className="login-form-container" onSubmit={this.onSubmitClick}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="login-image-logo"
            alt="website logo"
          />
          <div className="login-label-input-container">
            <label htmlFor="username" className="login-label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="login-input"
              placeholder="Username"
              value={username}
              onChange={this.onUsernameChange}
            />
          </div>
          <div className="login-label-input-container">
            <label htmlFor="password" className="login-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={this.onPasswordChange}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {this.onStatusCheck(errorMsg) ? (
            <p className="error-msg">*{errorMsg}</p>
          ) : null}
        </form>
      </div>
    )
  }
}

export default Login
