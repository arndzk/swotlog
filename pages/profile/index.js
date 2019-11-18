import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

import useStyles from './styles';

const Profile = ({ user }) => {
  const classes = useStyles();

  return (
    <Grid 
      className={classes.wrapper} 
      container justify="center" 
      alignItems="center">
        <AccountCircle className={classes.avatar} />
    </Grid>
  );
};

export default connect(state => ({ user: state.user }))(Profile);
