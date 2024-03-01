import { createTheme } from "@material-ui/core";

const Theme = createTheme({
  palette: {
    type: "dark",
  },
  typography: {
    fontFamily: [
      // "Comic Sans MS",
      // "Papyrus",
      // "Consolas",
      "Segoe UI",
      "Helvetica",
      "Arial",
      "sans-serif",
    ],
  },
  props: {
    MuiFormControl: {
      size: "small",
      variant: "outlined",
    },
    MuiTextField: {
      size: "small",
      variant: "outlined",
    },
  },
});

export default Theme;
