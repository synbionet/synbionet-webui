import BadgeIcon from '@mui/icons-material/Badge'

export function BadgeWrapper({ title, description }) {
  return (
    <>
      <div className="flex items-center space-x-3">
        <div className="border pt-2 px-3 pb-3 rounded-full border-gray-400">
          <BadgeIcon fontSize="large" />
        </div>
        <div className="flex flex-col">
          <div className="font-medium">{title}</div>
          <div className="text-xs">{description}</div>
        </div>
      </div>
    </>
  )
}
