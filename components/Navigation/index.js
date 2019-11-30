import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GroupIcon from '@material-ui/icons/Group';
import BookIcon from '@material-ui/icons/ChromeReaderMode';
import FeedIcon from '@material-ui/icons/LineWeight';
import Router from 'next/router'

import useStyles from './styles';

export default ({ asPath }) => {
  const classes = useStyles();

  return <BottomNavigation
    className={classes.navigation}
    value={asPath}
    onChange={(_, newValue) => Router.push(newValue)}
    showLabels>
    <BottomNavigationAction label="Feed" value="/" icon={<FeedIcon />} />
    <BottomNavigationAction label="Classes" value="/classes" icon={<BookIcon />} />
    <BottomNavigationAction label="Groups" value="/groups" icon={<GroupIcon />} />
  </BottomNavigation>
}