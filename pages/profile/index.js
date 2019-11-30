import { connect } from 'react-redux';
import { END } from 'redux-saga';
import { parseCookies } from 'nookies'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FaceIcon from '@material-ui/icons/Face';
import EmailIcon from '@material-ui/icons/Email';

import TabPanel from 'components/Profile/TabPanel';
import CheckList from 'components/Profile/CheckList';
import General from 'components/Profile/General'

import { fetchClasses } from 'actions/core';

import useStyles from './styles';

const Profile = ({ 
  user: { 
    firstName, 
    lastName, 
    email, 
    hasSubscribed,
    hasPassed
  }, 
  classes: subjects,
 }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0); // tab selection
  
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
        <General 
          firstName={firstName} 
          lastName={lastName} />
      </TabPanel>
      
      {/* Subscribed */}
      <TabPanel className={classes.tabPanel} value={value} index={1}>
        {
          subjects && 
            <CheckList 
              id="Subscribed" 
              list={subjects} 
              toCheck={hasSubscribed} />
        }
      </TabPanel>
      
      {/* Passed */}
      <TabPanel className={classes.tabPanel} value={value} index={2}>
        {
          subjects && 
            <CheckList 
              id="Passed" 
              list={subjects} 
              toCheck={hasPassed} />
        }
      </TabPanel>
    </Grid>
  );
};

Profile.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx); 

  if (!ctx.store.getState().classes.length) {
    await ctx.store.dispatch(fetchClasses(token));

    if (ctx.store.sagaTask && !ctx.isServer) {
      ctx.store.dispatch(END);
      await ctx.store.sagaTask.toPromise();
    }
  }
  
  return {}; // hmmmm..
}

export default connect(
  state => ({ 
    user: state.user,
    classes: state.classes,
  })
)(Profile);




