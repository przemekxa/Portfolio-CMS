import React, { useCallback } from "react";
import useSWR from "swr";
import { useDropzone } from "react-dropzone";

import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import MediaCard from "../components/MediaCard";
import { useNavigate } from "react-router-dom";
import { getSessionFetch } from "../checkSessionFetch";
import { ImageMetadata } from "../../common/image";

const Media: React.FC = () => {
  const navigate = useNavigate();
  const sessionFetch = React.useMemo(
    () => getSessionFetch(navigate),
    [navigate]
  );

  const { data: images, mutate } = useSWR<ImageMetadata[]>(
    "/api/image",
    getSessionFetch(navigate)
  );

  const onDrop = useCallback(async <T extends File>(acceptedFiles: T[]) => {
    if(acceptedFiles.length !== 1) {
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      if(reader.result === null) {
        return
      }
      const blob = new Blob([reader.result], { type: acceptedFiles[0].type });
      const formData = new FormData();
      formData.append("filename", acceptedFiles[0].name);
      formData.append("image", blob);
      try {
        await sessionFetch("/api/image",{
          method: "POST",
          body: formData
        });
        mutate();
      } catch (error) {
        console.log(error);
      }
    }
    reader.readAsArrayBuffer(acceptedFiles[0]);
  }, [mutate, sessionFetch]);
    
  const theme = useTheme();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxFiles: 1,
    onDrop
  });

  const dropZoneProps = getRootProps();
  const dropZoneInputProps = getInputProps();

  return (
    <>
      <Typography variant="h1" mb={2}>Media</Typography>
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
        {images?.map(image => (
          <Grid item key={image.id} xs={12} sm={6} md={4}>
            <MediaCard image={image} mutate={mutate}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Media;
