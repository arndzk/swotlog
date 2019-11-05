import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { login } from '../utils/auth';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  form: {
    textAlign: 'center',
  },
  formTitle: {
    margin: '20px auto 20px auto',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  }
}

const LoginForm = props => {
  const { classes } = props;

  const [state, setState] = useState({
    email: '',
    password: '',
    isLoading: false,
    errors: {},
  });

  function handleSubmit (event) {
    event.preventDefault();

    setState({
      ...state,
      isLoading: true,
    });
  }

  function onChange (event) {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const { errors, isLoading } = state;

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h4" className={classes.formTitle}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="E-mail"
            required
            className={classes.TextField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={state.email}
            onChange={onChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            required
            className={classes.TextField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={state.password}
            onChange={onChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={isLoading}
          >
            Login
          {isLoading && (
            <CircularProgress size={30} className={classes.progress} />
          )}
          </Button>
          <br />
          <small>New user? Sign up <Link href='/signup'><a>here</a></Link>!</small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginForm);