import React from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';
import Layout from '../components/Layout';
import { withAuthSync } from '../utils/auth';
import getHost from '../utils/gethost';

const Profile = props => {
  const { } = props;

  return (
    <Layout>
      <div>Hello!</div>
    </Layout>
  )
}

export default Profile;