import { Grid } from 'react-loader-spinner'

export function Loader() {
  return (
    <Grid
      height="80"
      width="80"
      color="#6366f1"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  )
}
