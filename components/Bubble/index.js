import Router from 'next/router'
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { logout } from 'actions/user';

const Bubble = ({ user, logout }) => {
  if (!user.id) return null;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const actions = { // may have more
    logout,
  }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = ({ route, action }) => {
    if (route) 
      Router.push(route)

    if (action) {
      actions[action]();
    }

    setAnchorEl(null);
  };

  return  <div>
    <IconButton
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleMenu}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={!!anchorEl}
      onClose={handleClose}
    >
      <MenuItem onClick={() => handleClose({ route: '/profile'})}>Profile</MenuItem>
      <MenuItem onClick={() => handleClose({ action: 'logout' })}>Logout</MenuItem>
    </Menu>
  </div>
}

export default connect(state => ({ user: state.user }), { logout })(Bubble);