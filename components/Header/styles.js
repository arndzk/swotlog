import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  logoLink: {
    "&:hover": {
      textDecoration: 'none'
    },
  },
  title: {
    flexGrow: 1
  }
}));