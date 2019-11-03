import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme ({
    palette: {
      primary: {
        light: '#33c9dc',
        main: '#00bcd4',
        dark: '#008394',
        contrastText: '#ffffff'
      },
      secondary: {
        light: '#ff6333',
        main: '#ff3d00',
        dark: '#b22a00',
        contrastText: '#ffffff'
      }
    },
  });

  export default theme;