import {
  Container,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import Headers from "./Header";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    width: "100%",
  },
});

function AppLayout({ children }) {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
        <Headers />
        <Container>{children}</Container>
      </div>
    </ThemeProvider>
  );
}

export default AppLayout;
