import React from "react";
import {
  isHeader,
  isOneImage,
  isPageHeader,
  isParagraph,
  isParagraphImage,
  isRichText,
  isTwoImages,
  Section,
  TwoImages,
} from "../../common/sections";

import {
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
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
        fullWidth
        value={section.header}
        onChange={(e) =>
          setSection((prev) => ({ ...prev, header: e.target.value }))
        }
      />
    );
  }

  if (isOneImage(section)) {
    return (
      <Grid container spacing={2} justifyItems="center">
        <Grid container item justifyContent="center" alignItems="end">
          <MediaPicker
            mediaId={section.src}
            onChange={(id) => {
              setSection((prev) => ({
                ...prev,
                src: id || "",
              }));
            }}
          />
          <TextField
            fullWidth
            label="Title"
            sx={{ margin: 2 }}
            value={section.title}
            onChange={(e) => {
              setSection((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
          />
        </Grid>
      </Grid>
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
        fullWidth
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

  if (isParagraphImage(section)) {
    return (
      <Stack spacing={2} alignItems="center">
        <MediaPicker
          mediaId={section.image}
          onChange={(id) => {
            setSection((prev) => ({
              ...prev,
              image: id || "",
            }));
          }}
        />

        <TextField
          fullWidth
          multiline
          minRows={5}
          value={section.paragraph}
          onChange={(e) =>
            setSection((prev) => ({ ...prev, paragraph: e.target.value }))
          }
        />
      </Stack>
    );
  }

  return null;
};

export default SectionDataEdit;
