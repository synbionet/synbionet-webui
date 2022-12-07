const HeaderButton = ({ buttonTitle, onClick }) => {
  return (
    <button style={{ maxWidth: '110px' }} className="text-lg truncate" onClick={onClick}>
      {buttonTitle}
    </button>
  )
}

export default HeaderButton
