import React from 'react';

class Signup extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            error: "",
        }
    }

    render() {
        return (
            <div className = "container">
                <h1 className = "mt-5 mb-5">Signup</h1>
                <form>
                    <div className = "form-group">
                        <label className = "text-muted">Username</label>
                        <input type = "text" className = "form-control"/>
                    </div>
                    <div className = "form-group">
                        <label className = "text-muted">Email</label>
                        <input type = "email" className = "form-control"/>
                    </div>
                    <div className = "form-group">
                        <label className = "text-muted">Password</label>
                        <input type = "password" className = "form-control"/>
                    </div>
                    <button className = "btn btn-raised btn-primary">Sign Up!</button>
                </form>
            </div>
        );
    }
}

export default Signup;