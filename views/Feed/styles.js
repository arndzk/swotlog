import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  feed: {
    padding: theme.spacing(8, 0, 6)
  },
  card: {
    minWidth: 275,
  },
  panelSummary: {
    "& > div:first-child": {
      display: 'block',
    }
  },
  domain: {
    fontSize: 14,
  },
  domainIcon: {
    fontSize: 13
  },
  avatar: {
    fontSize: '2em',
    color: '#e1e1e1',
    marginRight: theme.spacing(1)
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500
  },
  content: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  }
}));
