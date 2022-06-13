import React from "react";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import WhiteLogo from "../../assets/white_logo.svg";
import BlackLogo from "../../assets/black_logo.svg";
import BlueLogo from "../../assets/blue_logo.svg";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  return (
    <Stack
      direction={"row"}
      spacing={1}
      style={{
        cursor: "pointer",
      }}
      onClick={() => navigate("/")}
    >
      <img src={logo[color]} width={size === "large" ? 60 : 30} />
      <Typography variant={size === "large" ? "h2" : "h5"}>
        {t("common:eDepartment")}
      </Typography>
    </Stack>
  );
};

Logo.defaultProps = {
  color: "blue",
};

export default Logo;
