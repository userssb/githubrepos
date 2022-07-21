import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    repositoriesData: [],
    apiStatus: apiStatusConstants.initial,
    activeLanguageFilterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageFilterId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    // console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      //   console.log(fetchedData)
      const updatedData = fetchedData.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        imageUrl: eachItem.avatar_url,
      }))
      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  setActiveLanguageFilterId = newFilterId => {
    this.setState({activeLanguageFilterId: newFilterId}, this.getRepositories)
  }

  renderLanguageFiltersList = () => {
    const {activeLanguageFilterId} = this.state
    return (
      <ul className="languages-list">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            key={eachItem.id}
            languageDetails={eachItem}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
            isActive={eachItem.id === activeLanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader color="#0284c7" type="ThreeDots" height={70} width={70} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="repo-list">
        {repositoriesData.map(eachData => (
          <RepositoryItem key={eachData.id} repositoryDetails={eachData} />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="bg-cont">
        <div className="app-cont">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageFiltersList()}
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
