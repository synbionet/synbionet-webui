export function PrimaryButton({ text, onClick, defaultSize, disabled }) {
  return (
    <button
      onClick={onClick}
      className={`capitalize py-2 border-2 ${
        !disabled &&
        'border-indigo-500 bg-indigo-500 hover:border-indigo-400 hover:bg-indigo-400 transition duration-100 ease-in-out'
      } tracking-wider text-slate-100 font-semibold rounded-sm drop-shadow-sm text-center  ${
        defaultSize ? 'w-40' : 'w-full'
      } ${disabled && 'border-slate-500 bg-slate-500 opacity-60'}`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
