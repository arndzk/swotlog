import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Post from 'components/Post';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GroupIcon from '@material-ui/icons/Group';
import BookIcon from '@material-ui/icons/ChromeReaderMode';
import FeedIcon from '@material-ui/icons/LineWeight';

import useStyles from './styles';

const Feed = ({ posts }) => {
  const classes = useStyles(posts.length);

  const [value, setValue] = React.useState(0);
  

  return <Container className={classes.feed} maxWidth="md">
    {
      posts.length 
        ? <>
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              showLabels>
              <BottomNavigationAction label="Feed" icon={<FeedIcon />} />
              <BottomNavigationAction label="Classes" icon={<BookIcon />} />
              <BottomNavigationAction label="Groups" icon={<GroupIcon />} />
            </BottomNavigation>
            { posts.map(post => <Post />) }
          </>
        : <Typography variant="h2" component="h1">No posts yet</Typography>
    }
  </Container>
}

export default connect(({ posts }) => ({ posts }))(Feed);