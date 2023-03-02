/* eslint-disable react/no-unknown-property */
import './index.css'

const PassItem = props => {
  const {eachItem, passStatus, deleteSelectedpass} = props
  const {userName, passWord, webInput, id} = eachItem

  const onDeletePassword = () => {
    deleteSelectedpass(id)
  }

  return (
    <li className="list-item">
      <div className="first-char">
        <p>{userName[0]}</p>
      </div>
      <div>
        <p className="web-para">{webInput}</p>
        <p className="web-para">{userName}</p>
        {passStatus ? (
          <p className="web-para">{passWord}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-img"
          />
        )}
      </div>
      <button
        testid="delete"
        className="delete-btn"
        type="button"
        onClick={onDeletePassword}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PassItem
