import { ThreeDots } from 'react-loader-spinner'

export function ThreeDotsLoader({ height = 80, width = 80 }) {
  return (
    <ThreeDots
      height={height}
      width={width}
      radius="9"
      color="#6366f1"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  )
}
