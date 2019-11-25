import { connect } from 'react-redux';
import { parseCookies } from 'nookies'
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

import { updateUserData } from 'actions/user';
import { fetchClasses } from 'actions/core';

import useStyles from './styles';

const Profile = ({ 
  user: { firstName, lastName, email }, 
  classes: { 
    classes: subjects,
    subscribed,
    passed
  }
 }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0); // tab selection
  const [userData, setUserData] = React.useState({
    firstName,
    lastName,

    // backend needs subscribed & passed as an array of ids
    subscribed: subscribed.map(s => s.id),  
    passed: passed.map(s => s.id),  
  });

  const handleClasses = (key, index) => {
    const newValue = subjects[index].id;
    const shouldRemove = userData[key].includes(newValue)

    setUserData({
      ...userData,
      [key]: shouldRemove 
        ? userData[key].filter(v => v !== newValue) 
        : userData[key].concat(newValue),
    })
  }

  console.log(userData);
  
  
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
          <Tab label="General" />
          <Tab label="Subscribed to" />
          <Tab label="Passed" />
        </Tabs>
      </div>

      {/* General */}
      <TabPanel boxClassName={classes.verticalPanel} value={value} index={0}>
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
      <TabPanel value={value} index={1} style={{ width: '100% '}}>
        {
          subjects && 
            <CheckList 
              id="subscribed" 
              list={subjects} 
              toCheck={subscribed} 
              handleClasses={handleClasses} />
        }
      </TabPanel>
      
      {/* Passed */}
      <TabPanel value={value} index={2} style={{ width: '100% '}}>
        {
          subjects && 
            <CheckList 
              id="passed" 
              list={subjects} 
              toCheck={passed} 
              handleClasses={handleClasses} />
        }
      </TabPanel>
    </Grid>
  );
};

Profile.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx); 

  if (!ctx.store.getState().classes.passed) {
    await ctx.store.dispatch(fetchClasses(token));
    // await ctx.store.sagaTask.toPromise()
  }
  

  return {}; // hmmmm..
}

export default connect(
  state => ({ 
    user: state.user,
    classes: state.classes,
   }), 
  { updateUserData }
)(Profile);




