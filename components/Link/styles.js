import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  noDecorate: {
    "&:hover": {
      textDecoration: "none"
    }
  }
}));
