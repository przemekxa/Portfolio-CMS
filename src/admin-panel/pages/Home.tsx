import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Homepage } from "../../common/homepage";
import { getSessionFetch } from "../checkSessionFetch";
import MediaPicker from "../components/MediaPicker";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const sessionFetch = useMemo(
    () => getSessionFetch(navigate),
    [navigate]
  );

  const [data, setData] = useState<Homepage>(
    { title: "", backgroundImage: "", typingTitle: "", typingItems: [] }
  );

  const loadHome = useCallback(async () => {
    try {
      const data = await sessionFetch("/api/homepage");
      setData(data);
    } catch (error) {
      // TODO
      console.error(error);
    }
  }, [sessionFetch]);

  const saveHome = async () => {
    try {
      await sessionFetch("/api/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      // TODO
      console.error(error);
    }
  };

  useEffect(() => {
    loadHome();
  }, [loadHome]);

  return <>
  <Stack spacing={2}>
    <Typography variant="h1">Home</Typography>
    <Card>
      <CardContent>
        <Typography variant="h6" mb={2}>Title</Typography>
        <TextField
          fullWidth
          value={data.title}
          onChange={e => setData({...data, title: e.target.value}) }
        />
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <Typography variant="h6" mb={2}>Typing text</Typography>
        <Box display={"grid"} gridTemplateColumns={"auto 1fr"} gap={2} alignItems={"center"}>
          <Box>Title</Box>
          <TextField
            value={data.typingTitle}
            onChange={e => setData({...data, typingTitle: e.target.value}) }
          />

          <Box>Items<br />(newline separated)</Box>
          <TextField
            multiline
            value={data.typingItems.join("\n")}
            onChange={e => setData({...data, typingItems: e.target.value.split("\n") }) }
          />
        </Box>
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <Typography variant="h6" mb={2}>Background image</Typography>
        <MediaPicker
          mediaId={data.backgroundImage}
          onChange={id => setData({...data, backgroundImage: id ?? ""})}
        />
      </CardContent>
    </Card>

    <Stack direction={"row"} spacing={2}>
      <Button variant={"contained"} onClick={saveHome}>Save</Button>
      <Button variant={"outlined"} onClick={loadHome}>Restore</Button>
    </Stack>
    
  </Stack>
  
  </>;
};

export default Home;
