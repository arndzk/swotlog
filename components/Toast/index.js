import { connect } from 'react-redux';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

import { clearNotification } from 'actions/misc';

import useStyles from './styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

function MySnackbarContentWrapper(props) {
  const classes = useStyles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

const Toast = ({ notification: { message, type }, clearNotification }) => {
  const DISMISS_TIME = 3000;
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    clearNotification();
  };

  return message 
    ? <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={!!message}
          autoHideDuration={DISMISS_TIME}
          onClose={handleClose}
        >
          <MySnackbarContentWrapper
            onClose={handleClose}
            variant={type} // error, warning, info, success
            message={message}
          />
        </Snackbar>
      </div>
    : null;
}

export default connect(state => ({ notification: state.notification }), { clearNotification })(Toast);