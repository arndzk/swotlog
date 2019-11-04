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
    form: {
      textAlign: 'center',
    },
    formTitle: {
      margin: '20px auto 20px auto',
    },
    textField: {
      margin: '10px auto 10px auto',
    },
    button: {
      marginTop: 20,
      position: 'relative'
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10
    },
    progress: {
      position: 'absolute'
    }
  });

  export default theme;