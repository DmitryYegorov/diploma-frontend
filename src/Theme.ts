import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface Palette {
    neutral: Palette["primary"];
    cell: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
    cell: PaletteOptions["primary"];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }
}

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
      contrastText: "white",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    cell: {
      main: "#bde0ff",
      darker: "#4f667c",
    },
  },
});

export default theme;
