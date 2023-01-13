import React from "react";
import {
  isHeader,
  isPageHeader,
  isParagraph,
  isRichText,
  Section,
} from "../../common/sections";

import {
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import RichTextEditor from "./RichTextEditor";

type Props = {
  section: Section;
  setSection: React.Dispatch<React.SetStateAction<Section>>;
};
const SectionDataEdit: React.FC<Props> = ({ section, setSection }) => {
  if (isPageHeader(section)) {
    return (
      <>
        <Typography>Displays the title of the page.</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={section.showCard}
                onChange={(e, value) =>
                  setSection((prev) => ({ ...prev, showCard: value }))
                }
              />
            }
            label="Show the page card"
          />
        </FormGroup>
      </>
    );
  }

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

  if (isRichText(section)) {
    return (
      <RichTextEditor
        value={section.value}
        onChange={(data: string) =>
          setSection((prev) => ({ ...prev, value: data }))
        }
      />
    );
  }

  return null;
};

export default SectionDataEdit;
