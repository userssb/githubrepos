import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isActive, setActiveLanguageFilterId} = props
  const {id, language} = languageDetails
  const btnClassName = isActive
    ? 'language-btn active-language-btn'
    : 'language-btn'

  const onClickLanguageFilter = () => {
    setActiveLanguageFilterId(id)
  }

  return (
    <li className="list-item">
      <button
        type="button"
        onClick={onClickLanguageFilter}
        className={btnClassName}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
