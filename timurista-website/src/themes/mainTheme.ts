import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
// import orange from '@material-ui/core/colors/orange';

export let theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
    background: {
        paper: '#343434',
    },
  }
});

theme = responsiveFontSizes(theme);

export default theme