const HeaderButton = ({ buttonTitle, onClick, isActive }) => {
  return (
    <button
      style={{ maxWidth: '110px' }}
      className={`text-lg tracking-wider truncate ${
        isActive && 'underline decoration-indigo-500 underline-offset-4 decoration-2'
      }`}
      onClick={onClick}
    >
      {buttonTitle}
    </button>
  )
}

export default HeaderButton
