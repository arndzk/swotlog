import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { updateUserData } from 'actions/user';

import useStyles from './styles';

const CheckList = ({ id, list, toCheck, updateUserData }) => {
  const classes = useStyles();
  // state for view
  const [checked, setChecked] = React.useState(toCheck.map(item => list.findIndex(listItem => item.id === listItem.id)));
  // state for backend
  const [dataToSubmit, setDataToSubmit] = React.useState([]); 
  const submittableLength = dataToSubmit.length;
  
  const handleSubmit = ev => {
    ev.preventDefault();

    updateUserData({
      classes: dataToSubmit
    }) 
  }

  const handleToggle = (indexToChange, idToChange) => () => { 
    const currentIndex = checked.indexOf(indexToChange); 
    const isNew = currentIndex === -1
    const isAlreadyOnSubmit = dataToSubmit.find(sub => sub.id === idToChange) ;
    
    setChecked(checked[isNew
      ? 'concat' 
      : 'filter'](
        isNew
          ? indexToChange
          : index => index !== indexToChange));

    setDataToSubmit(dataToSubmit[isAlreadyOnSubmit
      ? 'filter'
      : 'concat'](
        isAlreadyOnSubmit
          ? sub => sub.id !== idToChange
          : [{ 
            id: idToChange, 
            [`has${id}`]: isNew 
          }])
    )
  };

  return <form onSubmit={ev => handleSubmit(ev)}>
    <div className={classes.info}>
      <Button 
        type="submit"
        variant="contained" 
        color="secondary"
        className={classes.btn}
        {...(!submittableLength && {
          disabled: true,
        })}>
        Update {id} classes {submittableLength 
          ? `(${submittableLength} change${submittableLength > 1 ? 's' : ''})` 
          : ''}
      </Button>
      <Typography className={classes.counter} variant="h4" component="h3">
        {checked.length}
        <span className={classes.slash}>/</span>
        {list.length}
      </Typography>
    </div>
    <List className={classes.list}>
      {list.map(({ name, id }, index) => 
        <ListItem 
          className={classes.listItem} 
          key={id} role={undefined} 
          dense button onClick={handleToggle(index, id)}>
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
  </form>
}

export default connect(null, { updateUserData })(CheckList);