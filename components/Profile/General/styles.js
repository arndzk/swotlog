import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  btn: {
    marginTop: theme.spacing(2)
  },
}));