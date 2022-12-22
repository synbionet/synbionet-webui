const HeaderButton = ({ buttonTitle, onClick }) => {
  return (
    <button
      style={{ maxWidth: '110px' }}
      className="text-lg tracking-wider truncate"
      onClick={onClick}
    >
      {buttonTitle}
    </button>
  )
}

export default HeaderButton
