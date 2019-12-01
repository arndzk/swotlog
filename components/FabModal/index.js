import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { doGroup } from 'actions/core';

import useStyles from './styles';

const FabModal = ({ doGroup }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
  }

  const handleCreate = () => {
    doGroup(name);
    handleClose()
  }

  return <>
    <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
      <AddIcon />
    </Fab>
    <Dialog
      style={{ minWidth: '40%'}}
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Create group <b>{name}</b></DialogTitle>
      <DialogContent>
        <TextField 
          id="standard-basic" 
          label="Name" 
          value={name} 
          autoComplete="off"
          onKeyDown={event => event.keyCode === 13 && (event.preventDefault(), handleCreate())}
          onChange={ev => setName(ev.target.value)}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={() => handleCreate()} color="primary" autoFocus>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  </>
}

export default connect(null, { doGroup })(FabModal);