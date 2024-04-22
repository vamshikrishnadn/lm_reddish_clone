import { createTheme } from '@material-ui/core/styles';

const customTheme = darkMode =>
  createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#ffb28a' : '#FF5700',
      },
      secondary: {
        main: darkMode ? '#f3b9bb' : '#212121',
      },
    },
    overrides: {
      MuiTypography: {
        root: {
          wordBreak: 'break-word',
        },
      },
    },
  });

export default customTheme;
