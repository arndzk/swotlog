import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    padding: theme.spacing(8, 0, 6),
  },
  group: {
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    "&:hover": {
      boxShadow: '4px 4px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
    }
  },
  creator: {
    fontSize: '0.8rem'
  }
}));