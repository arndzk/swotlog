import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import useStyles from './styles';

export default ({ related, doFollow }) => {
  const classes = useStyles();

  if (!related.length) return null;

  return <Paper className={classes.paper}>
    <Typography variant="h6" className={classes.title}>
      Follow Suggestions
    </Typography>
    <List className={classes.root}>
      {
        related.map(rel => <ListItem key={rel.id} className={classes.listItem}>
          <AccountCircleIcon className={classes.avatar} /> 
          <ListItemText className={classes.userName}>{rel.firstName} {rel.lastName}</ListItemText>
          <Button 
            variant="outlined" 
            size="small" 
            className={classes.button}  
            onClick={() => doFollow(rel.id)}
            color="secondary">
            Follow
          </Button>
        </ListItem>)
      }
    </List>
  </Paper>
}