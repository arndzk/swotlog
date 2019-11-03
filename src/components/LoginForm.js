import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { login } from '../utils/auth';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    }
}

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container className = {classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant = "h3" className = {classes.formTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit = {this.handleSubmit}>
                        <TextField 
                            id = "email" 
                            name = "email" 
                            type = "email" 
                            label = "E-mail" 
                            classname = {classes.TextField}
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
                            value = {this.state.password}
                            onChange = {this.handleChange}
                            fullWidth
                        />
                        <Button 
                            type = "submit" 
                            variant = "contained"
                            color = "primary"
                            className = {classes.button}
                        >Login</Button>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LoginForm);