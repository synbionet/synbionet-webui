const PrimaryButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full capitalize py-2 bg-indigo-500 tracking-wider text-slate-100 font-semibold rounded-sm drop-shadow-sm text-center hover:bg-indigo-400 transition duration-100 ease-in-out"
    >
      {text}
    </button>
  )
}

export default PrimaryButton
