import { useState } from 'react'
import { ReactComponent as SearchIcon } from '../assets/searchIcon.svg'

export function SearchBar() {
  const [searchText, setSearchText] = useState('')

  const handleChange = (e) => {
    setSearchText(e.target.value)
  }
  return (
    <div className="w-full bg-slate-100 border-slate-300 border rounded-sm flex items-center drop-shadow-sm">
      <SearchIcon className="w-8 h-8 px-2 fill-slate-500" />
      <input
        className="grow placeholder:italic placeholder:text-slate-500 text-slate-800 bg-transparent py-2 pr-3 focus:outline-none sm:text-sm tracking-wide"
        placeholder="Search Providers"
        type="text"
        name="search"
        value={searchText}
        onChange={handleChange}
        autoComplete="off"
      />
    </div>
  )
}
