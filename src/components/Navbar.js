import React from 'react';
import Link from 'next/link';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const ButtonLink = React.forwardRef(({ className, href, hrefAs, children, prefetch }, ref) => (
  <Link ref={ref} href={href} as={hrefAs} prefetch>
    <a className={className}>
      {children}
    </a>
  </Link>
));

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar className = "nav-container">
        <Button color="inherit" component={ButtonLink} href={'/index'}>Home</Button>
        <Button color="inherit" component={ButtonLink} href={'/login'}>Login</Button>
        <Button color="inherit" component={ButtonLink} href={'/signup'}>Signup</Button>
      </Toolbar>
    </AppBar>
  )
};

export default Navbar;
