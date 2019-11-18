import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SchoolIcon from '@material-ui/icons/School';
import Link from 'components/Link';

import useStyles from './styles';

export default () => {
  const classes = useStyles();

  return <AppBar position="relative">
    <Toolbar>
      <Typography variant="h6" color="inherit" noWrap>
        <Link className={classes.logoLink} color="inherit" href="/">Swotlog <SchoolIcon /></Link>
      </Typography>
    </Toolbar>
  </AppBar>
}