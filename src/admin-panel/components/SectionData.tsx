import React from "react";
import DOMpurify from "dompurify";
import HTMLParser from "html-react-parser";

import {
  isHeader,
  isParagraph,
  isRichText,
  Section,
} from "../../common/sections";

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

  if (isRichText(section)) {
    // const purified = DOMpurify.sanitize(section.value);
    const component = HTMLParser(section.value);
    return <>{component}</>;
  }

  return null;
};

export default SectionData;
