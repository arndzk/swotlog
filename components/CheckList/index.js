import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import useStyles from './styles';

export default ({ id, list, toCheck, handleClasses }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(toCheck.map(item => list.findIndex(listItem => item.id === listItem.id)));
  
  const handleToggle = value => () => { // this is working with indexes
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    handleClasses(id, value);
  };

  return <>
    <Typography className={classes.counter} variant="h4" component="h3">
      {checked.length}
      <span className={classes.slash}>/</span>
      {list.length}
    </Typography>
    <List className={classes.list}>
      {list.map(({ name, id }, index) => 
        <ListItem 
          className={classes.listItem} 
          key={id} role={undefined} 
          dense button onClick={handleToggle(index)}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked.indexOf(index) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': id }}
            />
          </ListItemIcon>
          <ListItemText id={id} primary={name} />
        </ListItem>)
      }
    </List>
  </>
}