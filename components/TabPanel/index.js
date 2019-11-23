
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default ({ children, value, index, boxClassName, ...other }) => (
  <Typography
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={`wrapped-tabpanel-${index}`}
    aria-labelledby={`wrapped-tab-${index}`}
    {...other}
  >
    <Box className={boxClassName} p={3}>{children}</Box>
  </Typography>
)
