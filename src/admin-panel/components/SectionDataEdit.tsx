import React from "react";
import {
  isHeader,
  isPageHeader,
  isParagraph,
  isRichText,
  isTwoImages,
  Section,
  TwoImages,
} from "../../common/sections";

import {
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import RichTextEditor from "./RichTextEditor";
import MediaPicker from "./MediaPicker";

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

  if (isTwoImages(section)) {
    return (
      <Grid container spacing={2}>
        <Grid container item xs={6} justifyContent="center" alignItems="end">
          <MediaPicker
            mediaId={section.images[0].src}
            onChange={(id) => {
              setSection((prev: TwoImages) => ({
                ...prev,
                images: [{ ...prev.images[0], src: id || "" }, prev.images[1]],
              }));
            }}
          />
          <TextField
            fullWidth
            label="Title"
            sx={{ margin: 2 }}
            value={section.images[0].title}
            onChange={(e) => {
              setSection((prev: TwoImages) => ({
                ...prev,
                images: [
                  { ...prev.images[0], title: e.target.value },
                  prev.images[1],
                ],
              }));
            }}
          />
        </Grid>
        <Grid container item xs={6} justifyContent="center" alignItems="end">
          <MediaPicker
            mediaId={section.images[1].src}
            onChange={(id) => {
              setSection((prev: TwoImages) => ({
                ...prev,
                images: [prev.images[0], { ...prev.images[1], src: id || "" }],
              }));
            }}
          />
          <TextField
            fullWidth
            label="Title"
            sx={{ margin: 2 }}
            value={section.images[1].title}
            onChange={(e) => {
              setSection((prev: TwoImages) => ({
                ...prev,
                images: [
                  prev.images[0],
                  { ...prev.images[1], title: e.target.value },
                ],
              }));
            }}
          />
        </Grid>
      </Grid>
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
