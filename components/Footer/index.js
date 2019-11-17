import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from 'components/Link';

import useStyles from './styles';

export default () => {
  const classes = useStyles();

  return <Box className={classes.footer} mt={8}>
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Swotlog
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  </Box>
}