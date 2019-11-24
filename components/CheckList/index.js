import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import useStyles from './styles';

export default ({ list, toCheck, callback }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(toCheck.map(item => list.findIndex(listItem => item.id === listItem.id)));
  
  React.useEffect(()=> {
    setChecked(toCheck.map(item => list.findIndex(listItem => item.id === listItem.id)))
  }, [list]);

  const handleToggle = value => () => { // this is working with indexes
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return <List className={classes.list}>
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
}