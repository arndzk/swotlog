import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import useStyles from './styles';

export default () => {
  const classes = useStyles();

return <div>
    groups

  <Fab color="primary" aria-label="add" className={classes.fab}>
    <AddIcon />
  </Fab>
  </div>
}