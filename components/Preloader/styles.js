import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  preloader: {
    position: 'fixed',
    display: 'block',
    width: '100%',
    borderRadius: '2px',
    margin: '0 0 1rem 0',
    overflow: 'hidden',
    top: '0',
    zIndex: '9999',
  },

  preloaderUndetermined: {
    "&:before": {
      content: "''",
      position: 'absolute',
      backgroundColor: 'inherit',
      top: 0,
      left: 0,
      bottom: 0,
      willChange: 'left, right',
      animation: '$undetermined 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite'
    },
    "&:after": {
      content: "''",
      position: 'absolute',
      backgroundColor: 'inherit',
      top: 0,
      left: 0,
      bottom: 0,
      willChange: 'left, right',
      animation: '$undetermined-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite',
      animationDelay: '1.15s'
    }
  },
  
  "@keyframes undetermined": {
    '0%': {
      left: '-35%',
      right: '100%'
    },
    '60%': {
      left: '100%',
      right: '-90%'
    },
    '100%': {
      left: '100%',
      right: '-90%'
    }
  },
  
  "@keyframes undetermined-short": {
      '0%': {
          left: '-200%',
          right: '100%'
      },
      '60%': {
          left: '107%',
          right: '-8%'
      },
      '100%': {
          left: '107%',
          right: '-8%'
      }
  }
}))