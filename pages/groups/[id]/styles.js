import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  feed: {
    padding: theme.spacing(8, 0, 6),
  },
  noTasks:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));