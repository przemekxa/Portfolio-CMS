import React from "react";
import HTMLParser from "html-react-parser";

import {
  isContact,
  isHeader,
  isOneImage,
  isPageHeader,
  isParagraph,
  isParagraphImage,
  isRichText,
  isSubpageCarousel,
  isTwoImages,
  Section,
} from "../../common/sections";

import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

type Props = {
  section: Section;
};
const SectionData: React.FC<Props> = ({ section }) => {
  if (isPageHeader(section)) {
    return (
      <Stack style={{ fontStyle: "italic" }}>
        <Typography>Displays the title of the page.</Typography>
        <Typography>
          Shows the page card: <b>{section.showCard ? "Yes" : "No"}</b>
        </Typography>
      </Stack>
    );
  }

  if (isHeader(section)) {
    return <Typography variant="h4">{section.header}</Typography>;
  }

  if (isOneImage(section)) {
    return (
      <Stack spacing={2}>
        <Card>
          <CardMedia
            component="img"
            src={`/api/image/${section.src}`}
            height={200}
          />
          <CardActions sx={{ justifyContent: "space-between", pl: 3 }}>
            <Typography>ID: {section.src}</Typography>
          </CardActions>
        </Card>
        <Box>
          Title: <b>{section.title}</b>
        </Box>
      </Stack>
    );
  }

  if (isTwoImages(section)) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardMedia
              component="img"
              src={`/api/image/${section.images[0].src}`}
              height={200}
            />
            <CardActions sx={{ justifyContent: "space-between", pl: 3 }}>
              <Typography>ID: {section.images[0].src}</Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardMedia
              component="img"
              src={`/api/image/${section.images[1].src}`}
              height={200}
            />
            <CardActions sx={{ justifyContent: "space-between", pl: 3 }}>
              <Typography>ID: {section.images[1].src}</Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          Title: <b>{section.images[0].title}</b>
        </Grid>
        <Grid item xs={6}>
          Title: <b>{section.images[1].title}</b>
        </Grid>
      </Grid>
    );
  }

  if (isParagraph(section)) {
    return <p>{section.contents}</p>;
  }

  if (isRichText(section)) {
    const component = HTMLParser(section.value);
    return <>{component}</>;
  }

  if (isParagraphImage(section)) {
    const component = HTMLParser(section.paragraph);

    return (
      <Stack spacing={2}>
        <Card>
          <CardMedia
            component="img"
            src={`/api/image/${section.image}`}
            height={200}
          />
          <CardActions sx={{ justifyContent: "space-between", pl: 3 }}>
            <Typography>ID: {section.image}</Typography>
          </CardActions>
        </Card>
        <Box>{component}</Box>
      </Stack>
    );
  }

  if (isSubpageCarousel(section)) {
    return (
      <Typography sx={{ fontStyle: "italic" }}>
        Displays subpages of this page in form of a carousel.
      </Typography>
    );
  }

  if (isContact(section)) {
    return (
      <Box
        display="grid"
        gridTemplateColumns="auto 1fr"
        columnGap={2}
        rowGap={2}
      >
        <p style={{ justifySelf: "end" }}>Phone:</p>
        <p>{section.phone}</p>
        <p style={{ justifySelf: "end" }}>Email:</p>
        <p>{section.email}</p>
        <p style={{ justifySelf: "end" }}>Address:</p>
        <p>{section.address}</p>
        <p style={{ justifySelf: "end" }}>Social media header:</p>
        <p>{section.socialHeader}</p>
        <p style={{ justifySelf: "end" }}>Social media items:</p>
        <ul style={{ display: "block", listStylePosition: "inside" }}>
          {section.social.map((s) => (
            <li>
              {s.icon} &ndash; <a href={s.href}>{s.href}</a>
            </li>
          ))}
        </ul>
      </Box>
    );
  }

  return null;
};

export default SectionData;
