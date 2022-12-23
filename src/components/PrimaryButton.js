const PrimaryButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full capitalize py-2 bg-gray-300 font-semibold rounded-sm drop-shadow-sm text-center"
    >
      {text}
    </button>
  )
}

export default PrimaryButton
