import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  counter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginBottom: theme.spacing(2)
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  slash: {
    fontWeight: 100,
    fontSize: '4rem' 
  },
  list: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
  },
  listItem: {
    width: 'unset'
  }
}));