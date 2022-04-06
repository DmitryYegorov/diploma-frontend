import { createTheme } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { red, blue, green, deepPurple } from "@material-ui/core/colors";

declare module "@material-ui/core/styles/createTheme" {
  interface Theme {
    status: {
      use: string;
      err: string;
      free: string;
      gout: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      use?: string;
      err?: string;
      free: string;
      gout: string;
    };
  }
}

export const baseTheme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
      },
    },
  },

  status: {
    use: blue[500],
    err: red[500],
    free: green[500],
    gout: deepPurple[700],
  },

  typography: {
    body1: {
      fontSize: "inherit",
    },
  },
});

const lightMode = createTheme({
  ...baseTheme,
  palette: {
    type: "light",
  },
});

const darkMode = createTheme({
  ...baseTheme,
  palette: {
    type: "dark",
  },
});

const themeMode: { [key: string]: Theme } = {
  lightMode,
  darkMode,
};

export const getThemeByName = (themeName: string): Theme => {
  return themeMode[themeName];
};
