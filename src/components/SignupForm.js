import React, { Component } from 'react';
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

class SignupForm extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newPersonData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }  
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container className = {classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant = "h4" className = {classes.formTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit = {this.handleSubmit}>
                        <TextField 
                            id = "email" 
                            name = "email" 
                            type = "email" 
                            label = "E-mail" 
                            classname = {classes.TextField}
                            helperText = {errors.email}
                            error = {errors.email ? true : false}
                            value = {this.state.email}
                            onChange = {this.handleChange}
                            fullWidth
                        />
                        <TextField 
                            id = "password" 
                            name = "password" 
                            type = "password" 
                            label = "Password" 
                            classname = {classes.TextField}
                            helperText = {errors.password}
                            error = {errors.password ? true : false}
                            value = {this.state.password}
                            onChange = {this.handleChange}
                            fullWidth
                        />
                        <TextField 
                            id = "confirmPassword" 
                            name = "confirmPassword" 
                            type = "confirmPassword" 
                            label = "Confirm Password" 
                            classname = {classes.TextField}
                            helperText = {errors.confirmPassword}
                            error = {errors.confirmPassword ? true : false}
                            value = {this.state.confirmPassword}
                            onChange = {this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant = "body2" className = {classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button 
                            type = "submit" 
                            variant = "contained"
                            color = "primary"
                            className = {classes.button}
                            disabled = {loading}
                        >
                            Sign Up
                            {loading && (
                                <CircularProgress size = {30} className = {classes.progress}/>
                            )}
                        </Button>
                        <br />
                        <small>Already have an account? Log in <Link href='/login'><a>here</a></Link>!</small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

//signup.propTypes = {
//    classes: PropTypes.object.isRequired
//}

export default withStyles(styles)(SignupForm);