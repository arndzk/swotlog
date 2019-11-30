import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  avatar: {
    width: 128,
    height: 128
  },
  wrapper: {
    marginTop: theme.spacing(4),
    flexDirection: 'column',
  },
  details: {
    marginTop: theme.spacing(1),
  },
  chipAway: {
    backgroundColor: '#fff'
  },
  tabSelect: {
    marginTop: theme.spacing(4),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 0px rgba(0,0,0,0.12)'
  },
  verticalPanel: {
    display: 'flex',
    flexDirection: 'column'
  },
  tabPanel: {
    width: '100%'
  }
}));