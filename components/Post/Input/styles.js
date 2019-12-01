import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  box: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    flex: 1
  },
}));