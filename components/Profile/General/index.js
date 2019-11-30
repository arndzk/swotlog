import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { updateUserData } from 'actions/user';
import useStyles from './styles';

const General = props => {
  const { firstName, lastName, updateUserData } = props;
  
  const classes = useStyles();
  const [dataToSubmit, setDataToSubmit] = React.useState({});
  const submittable = Object.keys(dataToSubmit).some(key => !!dataToSubmit[key] && dataToSubmit[key] !== props[key]);

  const handleSubmit = ev => {
    ev.preventDefault();

    updateUserData({
      firstName,
      lastName,
      ...dataToSubmit,
    })
  }
  
  React.useEffect(() => setDataToSubmit({}), [firstName, lastName]);

  return <form className={classes.form} onSubmit={ev => handleSubmit(ev)}>
    <TextField
      id="firstName"
      label="First Name"
      defaultValue={firstName}
      className={classes.textField}
      required
      margin="normal"
      onChange={ev => setDataToSubmit({ 
        ...dataToSubmit,
        [event.target.id]: ev.target.value
      })}
    />
    <TextField
      id="lastName"
      label="Last Name"
      defaultValue={lastName}
      className={classes.textField}
      required
      margin="normal"
      onChange={ev => setDataToSubmit({ 
        ...dataToSubmit, 
        [event.target.id]: ev.target.value
      })}
    />
    <Button 
      className={classes.btn}
      type="submit"
      variant="contained" 
      color="secondary"
      {...(!submittable && {
        disabled: true,
      })}>
      Update General Info
    </Button>
  </form>
}

export default connect(null, { updateUserData })(General);