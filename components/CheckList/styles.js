import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  list: {
    maxHeight: 500,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  listItem: {
    width: 'unset'
  }
}));