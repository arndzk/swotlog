import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GroupIcon from '@material-ui/icons/Group';

import useStyles from './styles';

const Post = () => {
  const classes = useStyles();
  const commentEl = React.useRef(null);
  const domain = 'class'; // api will return either class or group
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState('');

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

  return <Card className={classes.card}>
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
            <Button startIcon={
              <Badge 
                badgeContent={10} 
                color="secondary"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                className={classes.badgeCustom}
                >
                <ThumbUpIcon color="primary" />
              </Badge>
            }>Like</Button>
            <Button startIcon={<CommentIcon color="primary" />} onClick={() => handleCommentClick()}>Comment</Button>
          </ButtonGroup>
        </CardActions>
        <Paper className={classes.comment}>
            <Typography className={classes.userInfo}>
              <AccountCircleIcon className={classes.avatar} /> Takis Takopoulopoulakopoulos
            </Typography>
            <Typography component="p">
              nonsense comment :D 
            </Typography>
        </Paper>
        <Paper className={classes.comment}>
            <Typography className={classes.userInfo}>
              <AccountCircleIcon className={classes.avatar} /> Takis Takopoulopoulakopoulos
            </Typography>
            <Typography component="p">
              nonsense kind of big comment to test that nothing is broken. I'm Takis please talk to me :D 
            </Typography>
        </Paper>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <TextField
          multiline
          inputRef={commentEl}
          rows="4"
          label="Comment"
          placeholder="Have anything to say?"
          className={classes.textField}
          value={comment}
          margin="normal"
          variant="outlined"
          onChange={({target: { value }}) => setComment(value)}
          onKeyDown={event => event.keyCode === 13 && (event.preventDefault(), setComment(''))}
          />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </Card>
}

export default Post;