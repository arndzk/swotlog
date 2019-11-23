import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FaceIcon from '@material-ui/icons/Face';
import EmailIcon from '@material-ui/icons/Email';
import CheckList from 'components/CheckList';
import TabPanel from 'components/TabPanel';

import { fetchUserDetails, updateUserData } from 'actions/user';

import useStyles from './styles';

const Profile = ({ user: { firstName, lastName, email, subs, passed } }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('one'); // tab selection
  const [userData, setUserData] = React.useState({
    firstName,
    lastName,
  })
  
  return (
    <Grid 
      className={classes.wrapper} 
      container justify="center" 
      alignItems="center">
      <AccountCircle className={classes.avatar} color="secondary" />
      <Grid className={classes.details} container spacing={4} justify="center">
        <Grid item>
          <Chip 
            className={classes.chipAway}
            icon={<FaceIcon />} 
            label={`${firstName} ${lastName}`} />
        </Grid>
        <Grid item>
          <Chip
            className={classes.chipAway}
            icon={<EmailIcon />} 
            label={email} />
        </Grid>
      </Grid>
      <div className={classes.tabSelect}>
        <Tabs value={value} onChange={(ev, value) => setValue(value)}>
          <Tab value="one" label="General" />
          <Tab value="two" label="Subscribed to" />
          <Tab value="three" label="Passed" />
        </Tabs>
      </div>

      {/* General */}
      <TabPanel boxClassName={classes.verticalPanel} value={value} index="one">
        <TextField
          id="firstName"
          label="First Name"
          defaultValue={userData.firstName}
          className={classes.textField}
          margin="normal"
          onChange={ev => setUserData({ ...userData, [event.target.id]: ev.target.value})}
        />
        <TextField
          id="lastName"
          label="Last Name"
          defaultValue={userData.lastName}
          className={classes.textField}
          margin="normal"
          onChange={ev => setUserData({ ...userData, [event.target.id]: ev.target.value})}
        />
        <Button 
          className={classes.btn}
          variant="contained" 
          color="secondary">
          Update Info
        </Button>
      </TabPanel>
      
      {/* Subscribed */}
      <TabPanel value={value} index="two">
        <CheckList list={subs} />
      </TabPanel>
      
      {/* Passed */}
      <TabPanel value={value} index="three">
        <CheckList list={passed} />
      </TabPanel>
    </Grid>
  );
};

Profile.getInitialProps = async ({ store }) => {
  if (!store.getState().user.passed.length || !store.getState().user.subs.length)
    store.dispatch(fetchUserDetails())
  
  return {}; // hm
}

export default connect(state => ({ user: state.user }), { fetchUserDetails, updateUserData })(Profile);




