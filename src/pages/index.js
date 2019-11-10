import React from 'react';
import Layout from '../components/Layout';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Profile from '../components/Profile';
import Post from '../components/Post';

const Index = () => (
  <Layout>
    <Grid item xs = {12}>
      <Post></Post>
    </Grid>
  </Layout>
)

export default Index;