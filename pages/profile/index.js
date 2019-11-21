import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FaceIcon from '@material-ui/icons/Face';
import EmailIcon from '@material-ui/icons/Email';

import useStyles from './styles';

const TabPanel = (props) => {
  const { children, value, index, boxClassName, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      <Box className={boxClassName} p={3}>{children}</Box>
    </Typography>
  );
}

const Profile = ({ user: { firstName, lastName, email } }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');
  const [userData, setUserData] = React.useState({
    firstName,
    lastName,
    email
  })

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
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
        <Tabs value={value} onChange={handleTabChange}>
          <Tab value="one" label="General" />
          <Tab value="two" label="Subscribed to" />
          <Tab value="three" label="Passed" />
        </Tabs>
      </div>
      <TabPanel boxClassName={classes.verticalPanel} value={value} index="one">
        <TextField
          id="firstName"
          label="First Name"
          defaultValue={firstName}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="lastName"
          label="Last Name"
          defaultValue={lastName}
          className={classes.textField}
          margin="normal"
          onChange={() => console.log(this)}
        />
      </TabPanel>
      <TabPanel value={value} index="two">
        Item Two
      </TabPanel>
      <TabPanel value={value} index="three">
        Item Two
      </TabPanel>
    </Grid>
  );
};

export default connect(state => ({ user: state.user }))(Profile);




