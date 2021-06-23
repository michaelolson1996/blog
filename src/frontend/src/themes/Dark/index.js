import { createMuiTheme } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#0e243F"
        },
        secondary: {
            main: "#fff"
        },
        text: {
            primary: "#fff"
        },
        background: {
            paper: "#0e243F",
            default: "#0e2439"
        }
    },
    type: "dark",
    typography: {
        htmlFontSize: 16,
        fontFamily: 'Barlow Condensed'
    }
});

export default darkTheme;