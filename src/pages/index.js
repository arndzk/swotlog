import React from 'react';
import Layout from '../components/Layout';
import { Grid } from '@material-ui/core';

const Index = () => (
  <Layout>
    <Grid container spacing = {16}>
      <Grid item sm = {8} xs = {12}>
        <p>Content</p>
      </Grid>
      <Grid item sm = {4} xs = {12}>
        <p>Content</p>
      </Grid>
    </Grid>
  </Layout>
)

export default Index;