import Router from 'next/router'
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FabModal from 'components/FabModal';
import { fetchGroups } from 'actions/core';

import useStyles from './styles';
import { parseCookies } from 'nookies';

const Groups = ({ groups }) => {
  const classes = useStyles();

  return <div className={classes.root}>
    <Grid container spacing={3}>
      {
        groups.length ? groups.map(group => <Grid item sm={6} xs={12}>
          <Paper 
            key={group.id}
            onClick={() => Router.push(`/groups/${group.id}`)}
            className={classes.group}>
            <Typography variant="h5" component="h3">
              {group.title}
            </Typography>
            <Typography component="small" className={classes.creator}>
              by {group.creator.firstName} {group.creator.lastName}
            </Typography>
          </Paper>
        </Grid>) : <Typography variant="h2" component="h1">No groups yet</Typography>
      }
    </Grid>
    <FabModal />
  </div>
}

Groups.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  
  if (!ctx.store.getState().groups.length) {
    await ctx.store.dispatch(fetchGroups(token));
  }

  return { }
}

export default connect(state => ({ groups: state.groups }))(Groups);