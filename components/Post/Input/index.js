import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import useStyles from './styles.js';

export default () => {
  const classes = useStyles();

  const [course, setCourse] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setCourse(event.target.value);
  };
  
  return <Box className={classes.box}>
     <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Courses
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={course}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Idk</MenuItem>
          <MenuItem value={2}>idk 2</MenuItem>
          <MenuItem value={3}>Idk 3</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="outlined-multiline-static"
        label={`Create new post${!!course ? ` for ${course}` : ''}`}
        multiline
        rows="4"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        disabled={!course}
      />
    </Box>
}