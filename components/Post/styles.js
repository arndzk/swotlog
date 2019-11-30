import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  panel: {
    cursor: 'default',
  },
  card: {
    marginTop: '1rem',
    minWidth: 275,
  },
  panelSummary: {
    "& > div:first-child": {
      display: 'block',
    },
    "&.Mui-focused": {
      backgroundColor: '#fff',
    },
    cursor: 'auto!important',
    userSelect: 'auto'
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
  },
  badgeCustom: {
    "& > span": {
      height: '14px',
      display: 'flex',
      padding: '0px 2px',
      fontSize: '0.6rem'
    }
  },
  comment: {
    padding: theme.spacing(3, 2),
    boxShadow: 'none',
    backgroundColor: '#f9f9f9',
    marginTop: '5px',
    "& > p": {
      fontSize: '.9rem'
    }
  }
}));
