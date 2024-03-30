import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'

class PasswordManager extends Component {
  state = {
    isTrue: false,
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsLength: 0,
    passwordsList: [],
    isShow: false,
    searchInput: '',
  }

  ongettingEachItem = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state

    const newPasswordItem = {
      id: v4(),
      websiteInput,
      usernameInput,
      passwordInput,
    }

    this.setState(preState => ({
      passwordsList: [...preState.passwordsList, newPasswordItem],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      isTrue: true,
    }))
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = e => {
    this.setState({searchInput: e.target.value})
  }

  deleteItem = id => {
    const {passwordsList} = this.state
    const newList = passwordsList.filter(eachItem => eachItem.id !== id)
    const caseOf = newList.length !== 0
    this.setState({passwordsList: newList, isTrue: caseOf})
  }

  changeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  changeUserNameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  changePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  noPaswdImage = () => {
    return (
      <div className="no-pswd-div">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-passwords-img"
        />
        <p className="img-para">No Passwords</p>
      </div>
    )
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      isShow,
      searchInput,
      passwordsList,
    } = this.state

    let {isTrue} = this.state

    const newList = passwordsList.filter(eachValue =>
      eachValue.websiteInput.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="outer">
        <div className="inner">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="upper-div">
            <div className="upper-card-div">
              <form
                className="inner-card-div"
                onSubmit={this.ongettingEachItem}
              >
                <h1 className="head">Add New Password</h1>
                <div className="website-div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="website-img"
                  />
                  <input
                    className="website-input"
                    placeholder="Enter Website"
                    onChange={this.changeWebsiteInput}
                    value={websiteInput}
                  />
                </div>
                <div className="website-div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="website-img"
                  />
                  <input
                    className="website-input"
                    placeholder="Enter Username"
                    onChange={this.changeUserNameInput}
                    value={usernameInput}
                  />
                </div>
                <div className="website-div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="website-img"
                  />
                  <input
                    type="password"
                    className="website-input"
                    placeholder="Enter Password"
                    onChange={this.changePasswordInput}
                    value={passwordInput}
                  />
                </div>
                <button className="button" type="submit">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-manager-img"
              />
            </div>
          </div>
          <div className="upper-card-div2">
            <div className="your-pswds-div">
              <h1 className="your-pswd-name">Your Passwords</h1>
              <p>{newList.length}</p>
              <div className="search-div">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-img"
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.searchList}
                  value={searchInput}
                />
              </div>
            </div>
            <hr className="hr" />
            <div className="check-box-div">
              <label className="show-pswd" htmlFor="check">
                Show Passwords
              </label>
              <input type="checkbox" className="checkbox" id="check" />
            </div>

            {!isTrue && this.noPaswdImage()}
            {isTrue && (
              <ul>
                {newList.map(eachValue => (
                  <li className="list-item" key={eachValue.id}>
                    <div>
                      <p>{eachValue.websiteInput}</p>
                      <p>{eachValue.initial}</p>
                      <p>{eachValue.usernameInput}</p>
                    </div>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}
                    {isShow && <p>{eachValue.passwordInput}</p>}
                    <button
                      type="button"
                      onClick={() => this.deleteItem(eachValue.id)}
                      data-testid="delete"
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
