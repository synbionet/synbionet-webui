export function SecondaryButton({ text, onClick, defaultSize }) {
  return (
    <button
      onClick={onClick}
      className={`capitalize py-2 border border-indigo-500 tracking-wider text-indigo-500 font-semibold rounded-sm drop-shadow-sm text-center hover:border-indigo-400 hover:text-indigo-400 transition duration-100 ease-in-out ${
        defaultSize ? 'w-40' : 'w-full'
      }`}
    >
      {text}
    </button>
  )
}
