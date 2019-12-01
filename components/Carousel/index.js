import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import useStyles from './styles';

export default function AlignItemsList() {
  const classes = useStyles();

  return <Paper className={classes.paper}>
    <Typography variant="h6" className={classes.title}>
      Follow Suggestions
    </Typography>
    <List className={classes.root}>
      <ListItem className={classes.listItem}>
        <AccountCircleIcon className={classes.avatar} /> 
        <ListItemText className={classes.userName}>Takis</ListItemText>
        <Button variant="outlined" size="small" className={classes.button}  color="secondary">
          Follow
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <AccountCircleIcon className={classes.avatar} /> 
        <ListItemText className={classes.userName}>Takis</ListItemText>
        <Button variant="outlined" size="small" className={classes.button}  color="secondary">
          Follow
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <AccountCircleIcon className={classes.avatar} /> 
        <ListItemText className={classes.userName}>Takis</ListItemText>
        <Button variant="outlined" size="small" className={classes.button}  color="secondary">
          Follow
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <AccountCircleIcon className={classes.avatar} /> 
        <ListItemText className={classes.userName}>Takis</ListItemText>
        <Button variant="outlined" size="small" className={classes.button}  color="secondary">
          Follow
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <AccountCircleIcon className={classes.avatar} /> 
        <ListItemText className={classes.userName}>Takis</ListItemText>
        <Button variant="outlined" size="small" className={classes.button}  color="secondary">
          Follow
        </Button>
      </ListItem>
    </List>
  </Paper>
}