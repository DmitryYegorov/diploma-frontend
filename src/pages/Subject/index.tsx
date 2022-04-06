import React from "react";
import { Container } from "@mui/material";
import SubjectItem from "../../components/SubjectItem";

const Subject: React.FC = () => {
  return (
    <Container>
      <SubjectItem
        key={"ehhwkhewjkhdewlkhd"}
        author={"Dmitry Yegorov"}
        createdAt={new Date()}
        name={"Теория цвета"}
      />
    </Container>
  );
};

export default Subject;
