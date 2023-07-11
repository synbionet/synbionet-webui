import { Fade, Slide } from '@mui/material'

export function SlideWrapper({ Component, show, isTransitionDisabled, onExited }) {
  return (
    <Fade
      in={Boolean(show)}
      onExited={onExited}
      timeout={{ enter: isTransitionDisabled ? 0 : 300, exit: isTransitionDisabled ? 0 : 300 }}
      mountOnEnter
      unmountOnExit
    >
      <div>
        <Slide
          direction="right"
          in={Boolean(show)}
          timeout={{
            enter: isTransitionDisabled ? 0 : 300,
            exit: isTransitionDisabled ? 0 : 300,
          }}
        >
          <div>
            <Component />
          </div>
        </Slide>
      </div>
    </Fade>
  )
}
