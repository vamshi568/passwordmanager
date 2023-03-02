import {Component} from 'react'
import {v4} from 'uuid'

import './index.css'

import PassItem from '../AllPasswordItems'

class PasswordContainer extends Component {
  state = {
    passWordsList: [],
    showPassword: false,
    count: 0,
    webInput: '',
    userName: '',
    passWord: '',
    userSearchInput: '',
  }

  onFormSubmit = event => {
    event.preventDefault()
    const {webInput, userName, passWord} = this.state

    const newUserInfo = {
      id: v4(),
      webInput,
      userName,
      passWord,
    }
    this.setState(prevState => ({
      passWordsList: [...prevState.passWordsList, newUserInfo],
      count: prevState.count + 1,
      webInput: '',
      userName: '',
      passWord: '',
    }))
  }

  onUserSearch = event => {
    this.setState({userSearchInput: event.target.value})
  }

  onWebInput = event => {
    this.setState({webInput: event.target.value})
  }

  onUserNameInput = event => {
    this.setState({userName: event.target.value})
  }

  onPasswordInput = event => {
    this.setState({passWord: event.target.value})
  }

  changeChecked = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onFilterPasswordList = () => {
    const {passWordsList, userSearchInput} = this.state
    const filteredPassword = passWordsList.filter(eachPass =>
      eachPass.webInput.toUpperCase().includes(userSearchInput.toUpperCase()),
    )
    return filteredPassword
  }

  onDeletePassword = id => {
    const {passWordsList} = this.state
    const newDeletedPassList = passWordsList.filter(
      eachPasswords => eachPasswords.id !== id,
    )
    this.setState(prevState => ({
      passWordsList: newDeletedPassList,
      count: prevState.count - 1,
    }))
  }

  render() {
    const {count, webInput, userName, passWord, showPassword} = this.state
    const filteredList = this.onFilterPasswordList()
    const lenOfFilteredList = filteredList.length
    return (
      <div className="main-cont">
        <div className="applogo-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="form-cont">
          <form className="form-style" onSubmit={this.onFormSubmit}>
            <h1 className="form-head">Add New Password</h1>
            <div className="all-label-cont">
              <div className="label-cont">
                <label htmlFor="web input">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="web-input-image"
                  />
                </label>
                <input
                  id="web input"
                  type="text"
                  className="web-input"
                  placeholder="Enter Website"
                  onChange={this.onWebInput}
                  value={webInput}
                />
              </div>
              <div className="label-cont">
                <label htmlFor="username input">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="web-input-image"
                  />
                </label>
                <input
                  id="username input"
                  type="text"
                  className="web-input"
                  placeholder="Enter Username"
                  onChange={this.onUserNameInput}
                  value={userName}
                />
              </div>
              <div className="label-cont">
                <label htmlFor="password input">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="web-input-image"
                  />
                </label>
                <input
                  id="password input"
                  type="password"
                  className="web-input"
                  placeholder="Enter Password"
                  value={passWord}
                  onChange={this.onPasswordInput}
                />
              </div>
            </div>
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-image"
          />
        </div>
        <div className="list-itemcont">
          <div className="search-input-ico-cont">
            <div className="your-pass-cont">
              <h1>Your Passwords</h1>
              <p className="pass-head">{count}</p>
            </div>
            <div className="searc-input-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="input-style"
                onChange={this.onUserSearch}
              />
            </div>
          </div>
          <div className="check-box-cont">
            <input
              id="check-input"
              type="checkbox"
              onChange={this.changeChecked}
            />
            <label htmlFor="check-input" className="show-pass-para">
              Show passwords
            </label>
          </div>
          {lenOfFilteredList < 1 ? (
            <div className="no-pass-img-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-img"
              />
              <p className="no-pass-para">No Passwords</p>
            </div>
          ) : (
            <ul className="all-list-con">
              {filteredList.map(eachItem => (
                <PassItem
                  eachItem={eachItem}
                  key={eachItem.id}
                  passStatus={showPassword}
                  deleteSelectedpass={this.onDeletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordContainer
