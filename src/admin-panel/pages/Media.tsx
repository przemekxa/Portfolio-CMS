import React from "react";
import { useDropzone } from "react-dropzone";

import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import MediaCard from "../components/MediaCard";

const Media: React.FC = () => {
  const theme = useTheme();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

  const dropZoneProps = getRootProps();
  const dropZoneInputProps = getInputProps();

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          p: 2,
          height: 200,
          borderWidth: 4,
          borderRadius: 1,
          borderStyle: "dashed",
          borderColor: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.light,
          mb: 4,
        }}
        {...dropZoneProps}
      >
        <>
          <input {...dropZoneInputProps} />
          <Stack alignItems="center">
            <Typography variant="h4" color="primary">
              Upload image
            </Typography>
            <Typography color="primary">(.jpg, .jpeg, .png)</Typography>
          </Stack>
        </>
      </Box>
      <Grid container spacing={{ xs: 2, sm: 3 }} columns={12}>
        {acceptedFiles.map((file, index) => (
          // replace with images from server
          <Grid item key={`${file.name}-${index}`} xs={12} sm={6} md={4}>
            <MediaCard file={file} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Media;
