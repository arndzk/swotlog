import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import CommentIcon from '@material-ui/icons/Comment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GroupIcon from '@material-ui/icons/Group';
import { doComment } from 'actions/core';

import useStyles from './styles';

const Post = ({ data, doComment }) => {
  const classes = useStyles();
  const commentEl = React.useRef(null);
  const domain = data.class ? 'class' : null; 
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
        <CardContent className={classes.content}>
          {
            data.class && 
            <Typography className={classes.domain} color="textSecondary" gutterBottom>
              {data.class.name} {icon[domain]}
            </Typography>
          }
          <Typography className={classes.userInfo} component="b">
            <AccountCircleIcon className={classes.avatar} /> {data.author.firstName} {data.author.lastName}
            {
              !domain && data.assignee
                && <>
                  <NavigateNextIcon color="disabled" /> {data.assignee.firstName} {data.assignee.lastName}
                </>
            }
          </Typography>
          <Typography className={classes.content} variant="body2" component="p">
            {data.content}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
            <Button startIcon={<CommentIcon color="primary" />} onClick={() => handleCommentClick()}>Comment</Button>
        </CardActions>
        {
          data.comments &&
            data.comments.map(comment => <Paper key={`${data.id}_${comment.id}`} className={classes.comment}>
              <Typography className={classes.userInfo}>
                <AccountCircleIcon className={classes.avatar} />{comment.author.firstName} {comment.author.lastName}
              </Typography>
              <Typography component="p">
                {comment.content}
              </Typography>
          </Paper>)
        }
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
          onKeyDown={event => event.keyCode === 13 && (event.preventDefault(), doComment(comment, data.id), setComment(''))}
          />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </Card>
}

export default connect(null, { doComment })(Post);