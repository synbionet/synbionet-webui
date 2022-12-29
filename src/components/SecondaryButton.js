const SecondaryButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full capitalize py-2 border-2 border-indigo-500 tracking-wider text-indigo-500 font-semibold rounded-sm drop-shadow-sm text-center hover:border-indigo-400 hover:text-indigo-400 transition duration-100 ease-in-out"
    >
      {text}
    </button>
  )
}

export default SecondaryButton
