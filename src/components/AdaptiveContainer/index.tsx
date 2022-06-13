import React from "react";
import { Container, useMediaQuery } from "@mui/material";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AdaptiveContainer: React.FC<Props> = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width: 680px)");

  if (isDesktop) return <Container>{children}</Container>;

  return <>{children}</>;
};

export default AdaptiveContainer;
