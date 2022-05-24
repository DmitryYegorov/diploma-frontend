import React from "react";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import WhiteLogo from "../../assets/white_logo.svg";
import BlackLogo from "../../assets/black_logo.svg";
import BlueLogo from "../../assets/blue_logo.svg";

type Props = {
  color?: "white" | "blue" | "black";
  size?: "large" | "small";
};

const logo = {
  white: WhiteLogo,
  blue: BlueLogo,
  black: BlackLogo,
};

const Logo: React.FC<Props> = ({ color, size }) => {
  const { t } = useTranslation(["common"], { i18n });

  return (
    <Stack direction={"row"} spacing={1}>
      <img src={logo[color]} width={size === "large" ? 60 : 30} />
      <Typography variant={size === "large" ? "h3" : "h5"}>
        E-Department
      </Typography>
    </Stack>
  );
};

Logo.defaultProps = {
  color: "blue",
};

export default Logo;
