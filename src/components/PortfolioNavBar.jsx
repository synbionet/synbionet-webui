import { ReactComponent as Briefcase } from '../assets/briefcase.svg'
import { ReactComponent as CheckMark } from '../assets/checkMark.svg'
import GavelRoundedIcon from '@mui/icons-material/GavelRounded'
import { Badge } from '@mui/material'

function NavBarButton({ Icon, isActive, onClick }) {
  return (
    <button onClick={onClick}>
      <Icon
        className={`p-4 w-14 h-14 ${
          isActive ? 'bg-indigo-200 fill-slate-500' : 'bg-slate-200 fill-slate-400'
        }`}
      />
    </button>
  )
}

export function PortfolioNavBar({
  selectedTab,
  setSelectedTab,
  numOfferNotifications,
  numDisputeNotifications,
}) {
  return (
    <div className="flex-none w-14 border-r bg-slate-100 border-slate-300">
      <div className="flex flex-col items-stretch space-y-2 mt-6 fill-slate-400">
        <NavBarButton
          Icon={Briefcase}
          isActive={selectedTab === 'portfolio'}
          onClick={() => setSelectedTab('portfolio')}
        />
        <Badge badgeContent={numOfferNotifications} color="primary">
          <NavBarButton
            Icon={CheckMark}
            isActive={selectedTab === 'workflows'}
            onClick={() => setSelectedTab('workflows')}
          />
        </Badge>
        <Badge badgeContent={numDisputeNotifications} color="error">
          <button
            className={`h-14 p-4 flex flex-col items-center justify-center ${
              selectedTab === 'disputes'
                ? 'bg-indigo-200 text-slate-500'
                : 'bg-slate-200 text-slate-400'
            }`}
            onClick={() => setSelectedTab('disputes')}
          >
            <GavelRoundedIcon />
          </button>
        </Badge>
      </div>
    </div>
  )
}
