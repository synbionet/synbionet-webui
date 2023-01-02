export function PrimaryButton({ text, onClick, defaultSize }) {
  return (
    <button
      onClick={onClick}
      className={`capitalize py-2 border-2 border-indigo-500 hover:border-indigo-400 bg-indigo-500 tracking-wider text-slate-100 font-semibold rounded-sm drop-shadow-sm text-center hover:bg-indigo-400 transition duration-100 ease-in-out ${
        defaultSize ? 'w-40' : 'w-full'
      }`}
    >
      {text}
    </button>
  )
}
