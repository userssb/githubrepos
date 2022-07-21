import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    imageUrl,
  } = repositoryDetails

  return (
    <li className="repo-item">
      <img src={imageUrl} alt={name} className="repo-image" />
      <h1 className="repo-name">{name}</h1>
      <div className="stats-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="stats-text">{starsCount} stars</p>
      </div>
      <div className="stats-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p className="stats-text">{forksCount} forks</p>
      </div>
      <div className="stats-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="issues"
          className="icon"
        />
        <p className="stats-text">{issuesCount} issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
