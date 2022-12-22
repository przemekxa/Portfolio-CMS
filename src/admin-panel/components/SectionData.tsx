import React from "react";

import { isHeader, isParagraph, Section } from "../../common/sections";

import { Typography } from "@mui/material";

type Props = {
  section: Section;
};
const SectionData: React.FC<Props> = ({ section }) => {
  if (isHeader(section)) {
    return <Typography variant="h4">{section.header}</Typography>;
  }

  if (isParagraph(section)) {
    return <Typography>{section.contents}</Typography>;
  }

  return null;
};

export default SectionData;
