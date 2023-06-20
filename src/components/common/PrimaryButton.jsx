import { Button } from '@mui/material'
export function PrimaryButton({
  text,
  onClick,
  defaultSize,
  disabled,
  alternate,
  disableElevation,
}) {
  function getCustomStyles() {
    if (!alternate) {
      return {
        backgroundColor: 'rgb(99 102 241)',
        '&:hover': {
          backgroundColor: 'rgb(99 102 241)',
        },
      }
    } else {
      return {
        color: 'rgb(99 102 241)',
        borderColor: 'rgb(99 102 241)',
        '&:hover': {
          backgroundColor: 'rgb(224 231 255)',
          borderColor: 'rgb(99 102 241)',
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
        style={{ width: '100%' }}
        disableElevation={disableElevation}
        disabled={disabled}
        onClick={onClick}
        variant={alternate ? 'outlined' : 'contained'}
        sx={getCustomStyles()}
      >
        {text}
      </Button>
    </div>
  )
}
