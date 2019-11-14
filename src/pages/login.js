import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import { login } from '../utils/auth';
import LoginForm from '../components/LoginForm';

function Login () {
  return (
    <Layout>
    <LoginForm></LoginForm>
    </Layout>
  )
}

export default Login;