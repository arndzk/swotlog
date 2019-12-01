import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: 56 /* navigation height */ + theme.spacing(2),
    right: theme.spacing(2),
  },
}));