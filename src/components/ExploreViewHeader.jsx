import { SearchBar } from './SearchBar'

function ButtonBar() {
  const buttonOptions = ['Services', 'Data', 'Materials', 'View All']
  return (
    <div className="flex space-x-4 border-slate-300 drop-shadow-sm border-2 h-10 rounded-sm px-2 items-center text-sm font-semibold uppercase tracking-wider text-slate-500 bg-gray-100">
      {buttonOptions.map((button) => (
        <button key={button}>{button}</button>
      ))}
    </div>
  )
}

export function ExploreViewHeader() {
  return (
    <div className="flex h-14 items-center px-8 mb-2 pt-3">
      <div className="grow px-2">
        <SearchBar />
      </div>
      {/* <ButtonBar /> */}
    </div>
  )
}
