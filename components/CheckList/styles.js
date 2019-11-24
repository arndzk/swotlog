import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  list: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
  },
  listItem: {
    width: 'unset'
  }
}));