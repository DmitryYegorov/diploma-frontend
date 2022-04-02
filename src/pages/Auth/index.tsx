import React from "react";
import { Paper } from "@mui/material";
import TextInput from "../../components/TextInput";

const Auth: React.FC = () => {
  return (
    <Paper>
      <TextInput label={"email"} />
    </Paper>
  );
};

export default Auth;
