import React from "react";

import { isHeader, isParagraph, Section } from "../../common/sections";

import { TextField } from "@mui/material";

type Props = {
  section: Section;
  setSection: React.Dispatch<React.SetStateAction<Section>>;
};
const SectionDataEdit: React.FC<Props> = ({ section, setSection }) => {
  if (isHeader(section)) {
    return (
      <TextField
        value={section.header}
        onChange={(e) =>
          setSection((prev) => ({ ...prev, header: e.target.value }))
        }
      />
    );
  }

  if (isParagraph(section)) {
    return (
      <TextField
        multiline
        minRows={5}
        value={section.contents}
        onChange={(e) =>
          setSection((prev) => ({ ...prev, contents: e.target.value }))
        }
      />
    );
  }

  return null;
};

export default SectionDataEdit;