import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { doPost } from 'actions/core';

import useStyles from './styles.js';

const PostInput = ({ id, doPost }) => {
  const classes = useStyles();
  const [content, setPost] = React.useState('');

  return <Paper className={classes.box}>
    <TextField
      id="outlined-multiline-static"
      label='Create a task'
      value={content}
      multiline
      rows="4"
      className={classes.textField}
      margin="normal"
      onChange={({target: { value }}) => setPost(value)}
      onKeyDown={event => event.keyCode === 13 && (event.preventDefault(), doPost(content, ''), setPost(''), setCourse(''))} />
  </Paper>
}

export default connect(null, { doPost })(PostInput);