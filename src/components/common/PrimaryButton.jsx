import { Button } from '@mui/material'
export function PrimaryButton({
  text,
  onClick,
  defaultSize,
  disabled,
  alternate,
  disableElevation,
  size = '',
  endIcon,
  isTextButton,
}) {
  function getCustomStyles() {
    if (isTextButton) return {}
    if (!alternate) {
      return {
        backgroundColor: '#005b94',
        '&:hover': {
          backgroundColor: '#005b94',
        },
      }
    } else {
      return {
        color: '#005b94',
        borderColor: '#005b94',
        '&:hover': {
          backgroundColor: 'rgba(0, 91, 148, 0.1)',
          borderColor: '#005b94',
        },
      }
    }
  }
  return (
    // <button
    //   onClick={onClick}
    //   className={`capitalize py-2 border ${
    //     !disabled &&
    //     'border-indigo-500 bg-indigo-500 hover:border-indigo-400 hover:bg-indigo-400 transition duration-100 ease-in-out'
    //   } tracking-wider text-slate-100 font-semibold rounded-sm drop-shadow-sm text-center  ${
    //     defaultSize ? 'w-40' : 'w-full'
    //   } ${disabled && 'border-slate-500 bg-slate-500 opacity-60'}`}
    //   disabled={disabled}
    // >
    //   {text}
    // </button>

    <div className={defaultSize ? 'w-40' : 'w-full'}>
      <Button
        size={size}
        style={{ width: '100%' }}
        disableElevation={disableElevation}
        disabled={disabled}
        onClick={onClick}
        variant={isTextButton ? 'text' : alternate ? 'outlined' : 'contained'}
        sx={getCustomStyles()}
        endIcon={endIcon}
      >
        {text}
      </Button>
    </div>
  )
}
