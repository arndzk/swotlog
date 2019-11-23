import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export default ({ list, callback }) => {
  const [checked, setChecked] = React.useState(list.map((s, i) => s.status && i).filter(s => s !== false));

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

  return <List>
    {list.map(({ className, classId }, index) => 
      <ListItem key={classId} role={undefined} dense button onClick={handleToggle(index)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.indexOf(index) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': classId }}
          />
        </ListItemIcon>
        <ListItemText id={classId} primary={className} />
      </ListItem>)
    }
  </List>
}