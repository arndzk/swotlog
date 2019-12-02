import { connect } from 'react-redux';
import { parseCookies } from 'nookies';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Task from 'components/Task';
import Input from 'components/Task/Input';

import { fetchGroupDetails } from 'actions/core';
import useStyles from './styles'

const Group = ({ group, groupId, followers }) => {
  const classes = useStyles();
  
  return <Container className={classes.feed} maxWidth="md">
    <Typography variant="h6">Group: <b>{group.title}</b></Typography>
    <Input id={groupId} users={followers} />
    {group?.tasks?.length 
      ? group.tasks.map(task => <Task key={task.id} data={task} />)
      : <Typography className={classes.noTasks} variant="h5" component="h2">No tasks yet</Typography>}
  </Container>
}

Group.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  
  await ctx.store.dispatch(fetchGroupDetails(token, ctx.query.id));

  return { 
    groupId: ctx.query.id
  }
}

export default connect(state => ({ 
  group: state.currentGroup, 
  followers: state.user.followers }))(Group);