import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { doPost } from 'actions/core';

import useStyles from './styles.js';

const PostInput = ({ courses, doPost }) => {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [course, setCourse] = React.useState('');
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [content, setPost] = React.useState('');
  
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return <Paper className={classes.box}>
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        Courses
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={course}
        onChange={ev => setCourse(ev.target.value)}
        labelWidth={labelWidth}
      >
        <MenuItem value={0}>
          <em>None</em>
        </MenuItem>
        {
          courses.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)
        }
      </Select>
    </FormControl>
    <TextField
      id="outlined-multiline-static"
      label={`Create new post${!!course ? ` for ${courses.find(c => c.id === course).name}` : ''}`}
      value={content}
      multiline
      rows="4"
      className={classes.textField}
      margin="normal"
      disabled={!course}
      onChange={({target: { value }}) => setPost(value)}
      onKeyDown={event => event.keyCode === 13 && (event.preventDefault(), doPost(content, course), setPost(''))}
      />
  </Paper>
}

export default connect(state => ({ courses: state.classes }), { doPost })(PostInput);