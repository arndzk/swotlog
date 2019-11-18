# Swotlog :rocket:

## Patterns

- For every new component or page, create a new folder under `components` or `pages` respectively with the desired name
- `index.js` **must** be the main file of your component or page
- A `styles.js` can be created if styling needs to be applied on your component/page keeping the following pattern:

```javascript
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  myClass: {
    backgroundColor: theme.palette.secondary.main,
    width: "100%"
  }
}));
```

Then on your component:

```javascript
import useStyles from "./styles";

export default () => {
  const classes = useStyles();

  return <div className={classes.myClass}>...
};
```

## Notes

- Import components like below no matter where you are at

```javascript
import Name from "components/Name";
```
