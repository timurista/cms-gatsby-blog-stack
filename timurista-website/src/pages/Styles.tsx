import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
    border: 0,
    fontSize: 16,
    borderRadius: 3,
    marginTop: 60,
    boxShadow: "none",
    minHeight: "400px",
    padding: theme.spacing(2),
  },
  divider: {
    margin: 20,
  },
  link: {
    color: theme.palette.primary.light,
  },
}));
