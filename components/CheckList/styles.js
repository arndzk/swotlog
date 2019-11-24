import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  counter: {
    display: 'flex',
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