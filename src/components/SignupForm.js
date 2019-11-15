import React, { useState, useRef } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

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
  keyboardDatePicker: {
    margin: '20px auto 20px auto',
    position: 'relative'
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
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

const SignupForm = props => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedDate: new Date(),
    isLoading: false,
    errors: {},
  });

  const { classes } = props;
  const { errors, isLoading } = state;

  function handleSubmit (event) {
    event.preventDefault();

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    var registration = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;

    const { firstName, lastName, email, password, confirmPassword, selectedDate} = state;
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
    } else {
      const newUser = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        date_of_birth: selectedDate,
        registration
      };

      fetch("http://localhost:3001/users/create", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newUser)
      })
      .then(response => {
        return response.json()
      })
      .catch(err => console.log(err));

      setState({
        ...state,
        isLoading: true,
      });
    }
  }

  function onChange (event) {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h4" className={classes.formTitle}>
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="firstName"
            type="firstName"
            label="First Name"
            required={true}
            className={classes.textField}
            helperText={errors.firstName}
            error={errors.firstName ? true : false}
            value={state.firstName}
            onChange={onChange}
            fullWidth
          />
          <TextField
            name="lastName"
            type="lastName"
            label="Last Name"
            required={true}
            className={classes.textField}
            helperText={errors.lastName}
            error={errors.lastName ? true : false}
            value={state.lastName}
            onChange={onChange}
            fullWidth
          />
          <TextField
            name="email"
            type="email"
            label="E-mail"
            required={true}
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={state.email}
            onChange={onChange}
            fullWidth
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            required={true}
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={state.password}
            onChange={onChange}
            fullWidth
          />
          <TextField
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            required={true}
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={state.confirmPassword}
            onChange={onChange}
            fullWidth
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              name="selectedDate"
              label="Birthday"
              required={true}
              format="dd/MM/yyyy"
              className={classes.keyboardDatePicker}
              helperText={errors.keyboardDatePicker}
              error={errors.password ? true : false}
              value={state.selectedDate}
              onChange={onChange}
              fullWidth
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
           />
          </MuiPickersUtilsProvider>
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
            onClick ={handleSubmit}
          >
            Sign Up
            {isLoading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>Already have an account? Log in <Link href='/login'><a>here</a></Link>!</small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

export default withStyles(styles)(SignupForm);