import SearchBar from './SearchBar'

const ButtonBar = () => {
  const buttonOptions = ['Services', 'Data', 'Materials', 'View All']
  return (
    <div className="flex space-x-4 border-white border-opacity-10 border-2 h-10 rounded px-2 items-center">
      {buttonOptions.map((button) => (
        <button key={button}>{button}</button>
      ))}
    </div>
  )
}

const ExploreViewHeader = () => {
  return (
    <div className="flex h-14 items-center px-8 mb-2 pt-3">
      <div className="grow px-2">
        <SearchBar />
      </div>
      <ButtonBar />
    </div>
  )
}

export default ExploreViewHeader
