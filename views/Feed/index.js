import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Post from 'components/Post';

import useStyles from './styles';

const Feed = ({ posts }) => {
  const classes = useStyles(posts.length);

  return <Container className={classes.feed} maxWidth="md">
    {
      posts.length 
        ? posts.map(post => <Post />)
        : <Typography variant="h2" component="h1">No posts yet</Typography>
    }
  </Container>
}

export default connect(({ posts }) => ({ posts }))(Feed);