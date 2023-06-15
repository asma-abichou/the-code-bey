// Write your code here
import './commentItem.css'

const CommentItem = props => {
  const {arrayList, deleteComment, toggleFavorite} = props
  const {
    id,
    student,
    
    content,
    
    
    isFavorite,
  } = arrayList
  const imgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const addClass = isFavorite ? 'sky-blue' : ''
  const favButton = () => {
    toggleFavorite(id)
  }
  const delButton = () => {
    deleteComment(id)
  }
  return (
    <li className="comment-item" key={id}>
      <div className="content-holder">
        <div className="sub-holder">
          <div className="name-holder">
            <h1 className="username">{student.firstName}</h1>
         
          </div>
          <p className="comment-line">{content}</p>
        </div>
      </div>
      <div className="icons-holder">
        <button type="button" className="like-btn" onClick={favButton}>
          <img src={imgUrl} className="image2" alt="like" />
        </button>
        <button
          type="button"
          className="del-btn"
          onClick={delButton}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="del-image"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}
export default CommentItem;