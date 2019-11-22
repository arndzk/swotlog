import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  feed: hasPosts => ({
    ...(!hasPosts && {
      display: 'flex',
      justifyContent: 'center'
    }),
    padding: theme.spacing(8, 0, 6),
  })
}));
