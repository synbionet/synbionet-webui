import { useState } from 'react'
import { ReactComponent as SearchIcon } from '../assets/searchIcon.svg'

const SearchBar = () => {
  const [searchText, setSearchText] = useState('')

  const handleChange = (e) => {
    setSearchText(e.target.value)
  }
  return (
    <div className="w-full bg-gray-100 border-slate-300 border-2 rounded-sm flex items-center drop-shadow-sm">
      <SearchIcon className="w-8 h-8 px-2 fill-slate-500" />
      <input
        className="grow placeholder:italic placeholder:text-slate-500 text-slate-800 bg-transparent py-2 pr-3 focus:outline-none sm:text-sm tracking-wide"
        placeholder="Search marketplace..."
        type="text"
        name="search"
        value={searchText}
        onChange={handleChange}
        autoComplete="off"
      />
    </div>
  )
}

export default SearchBar
