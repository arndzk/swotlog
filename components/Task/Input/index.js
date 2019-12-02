import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { doTask } from 'actions/core';

import useStyles from './styles.js';

const PostInput = ({ id, users, doTask }) => {
  const classes = useStyles();
  const [content, setPost] = React.useState('');
  const [user, setUser] = React.useState('');
  const [labelWidth, setLabelWidth] = React.useState(0);
  const inputLabel = React.useRef(null);
  const inputEl = React.useRef(null);
  
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return <Paper className={classes.box}>
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        Follower to delegate
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={user}
        onChange={ev => (setUser(ev.target.value), setTimeout(() => inputEl.current.focus(), 300))}
        labelWidth={labelWidth}
      >
        <MenuItem value={0}>
          <em>None</em>
        </MenuItem>
        {
          users && users.map(user => <MenuItem key={user.id} value={user.id}>{user.firstName} {user.lastName}</MenuItem>)
        }
      </Select>
    </FormControl>
    <TextField
      id="outlined-multiline-static"
      label='Create a task'
      value={content}
      multiline
      inputRef={inputEl}
      rows="4"
      className={classes.textField}
      margin="normal"
      disabled={!user}
      onChange={({target: { value }}) => setPost(value)}
      onKeyDown={event => event.keyCode === 13 && (event.preventDefault(), doTask(id, content, user), setPost(''), setUser(''))} />
  </Paper>
}

export default connect(null, { doTask })(PostInput);