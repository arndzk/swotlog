// template cutt.ly/DeHfa4y
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SchoolIcon from '@material-ui/icons/School';
import Typography from '@material-ui/core/Typography';
import Link from 'components/Link';
import { signUp } from 'actions/user';

import useStyles from './styles';

const SignUp = ({ signUp }) => {
  const classes = useStyles();
  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleSubmit = event => {
    event.preventDefault()
    signUp(data);
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <SchoolIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              value={data.firstName}
              autoFocus
              onChange={e => setData({
                ...data,
                [e.target.id]: e.target.value
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              value={data.lastName}
              onChange={e => setData({
                ...data,
                [e.target.id]: e.target.value
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              value={data.email}
              onChange={e => setData({
                ...data,
                [e.target.id]: e.target.value
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              inputProps={{ pattern: "(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$" }}
              autoComplete="current-password"
              value={data.password}
              onChange={e => setData({
                ...data,
                [e.target.id]: e.target.value
              })}
            />
            <Typography 
              className={classes.pswTip}
              component="i" 
              variant="span"
              >
                At least 8 characters including:&nbsp;
                  <b>uppercase, lowercase, number/special character</b>
            </Typography>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/signin" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default connect(null, { signUp })(SignUp);