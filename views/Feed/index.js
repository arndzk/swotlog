import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import TextField from '@material-ui/core/TextField';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GroupIcon from '@material-ui/icons/Group';

import useStyles from './styles';

const Feed = () => {
  const classes = useStyles();
  const commentEl = React.useRef(null);
  const domain = 'class'; // api will return either class or group
  const [expanded, setExpanded] = React.useState(false);

  const handleCommentClick = () => {
    if (!expanded) {
      setTimeout(() => {
        commentEl.current.focus();
      }, 300);
    }
    setExpanded(!expanded);
  }

  const icon = {
    class: <MenuBookIcon className={classes.domainIcon} />,
    group: <GroupIcon className={classes.domainIcon} />
  }
  return <div className={classes.feed}>
    <Card className={classes.card}>
      <ExpansionPanel square expanded={expanded}>
        <ExpansionPanelSummary className={classes.panelSummary}>
          <CardContent>
            <Typography className={classes.domain} color="textSecondary" gutterBottom>
              Artificial Intelligence {icon[domain]}
            </Typography>
            <Typography className={classes.userInfo} component="b">
              <AccountCircleIcon className={classes.avatar} /> Takis Takopoulopoulakopoulos
            </Typography>
            <Typography className={classes.content} variant="body2" component="p">
              Anyone able to solve homework 2.3? I really need some help.
            </Typography>
          </CardContent>
          <CardActions>
            <ButtonGroup fullWidth>
              <Button startIcon={<ThumbUpIcon color="primary" />}>Like</Button>
              <Button startIcon={<CommentIcon color="primary" />} onClick={() => handleCommentClick()}>Comment</Button>
            </ButtonGroup>
          </CardActions>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TextField
            multiline
            inputRef={commentEl}
            rows="4"
            label="Comment"
            placeholder="Have anything to say?"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Card>
  </div>
}

export default Feed;