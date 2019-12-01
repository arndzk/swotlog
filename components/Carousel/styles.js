import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  root: {
    width: '100%',
    display: 'flex',
    overflowX: 'auto',
    backgroundColor: '#3e3e3e',
    "&::-webkit-scrollbar": {
      width: 5,
      height: 7
    },
    "&::-webkit-scrollbar-track": {
      background: '#f8f8f8'
    },
    "&::-webkit-scrollbar-thumb": {
      background: '#ddd',
    },
  },
  title: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    fontSize: '1rem',
    backgroundColor: '#3e3e3e',
    color: '#fff',
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  avatar: {
    fontSize: '2em',
    color: '#e1e1e1',
    marginRight: theme.spacing(1)
  },
  listItem: {
    color: '#fff',
    borderRight: '1px solid #4e4e4e;'
  },
  userName: {
    maxWidth: 100,
    fontSize: '0.8rem',

    "& span": {
      fontSize: '0.8rem'
    }
  },
  button: {
    marginLeft: theme.spacing(1)
  }
}));
