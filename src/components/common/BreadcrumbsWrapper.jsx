import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

export function BreadcrumbsWrapper({ serviceName, pageName }) {
  const breadcrumbs = [
    <Typography className="capitalize" key="1" color="text.primary">
      {serviceName}
    </Typography>,
    <Typography className="capitalize" key="2" color="text.primary">
      {pageName}
    </Typography>,
  ]

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {breadcrumbs}
    </Breadcrumbs>
  )
}
