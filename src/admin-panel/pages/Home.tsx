import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionFetch } from "../checkSessionFetch";
import { Homepage } from "../../common/homepage";

import {
  Card,
  CardContent,
  Fab,
  Grow,
  TextField,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import MediaPicker from "../components/MediaPicker";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const sessionFetch = useMemo(() => getSessionFetch(navigate), [navigate]);

  const [data, _setData] = useState<Homepage>({
    title: "",
    backgroundImage: "",
    typingTitle: "",
    typingItems: [],
  });
  const [didHomeChange, setDidHomeChange] = React.useState(false);

  const setData = (action: React.SetStateAction<Homepage>) => {
    setDidHomeChange(true);
    _setData(action);
  };

  const loadHome = useCallback(async () => {
    try {
      const data = await sessionFetch("/api/homepage");
      setData(data);
      setDidHomeChange(false);
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
      setDidHomeChange(false);
    } catch (error) {
      // TODO
      console.error(error);
    }
  };

  useEffect(() => {
    loadHome();
  }, [loadHome]);

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h1">Home</Typography>
        <Card>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Title
            </Typography>
            <TextField
              fullWidth
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Typing text
            </Typography>
            <Box
              display={"grid"}
              gridTemplateColumns={"auto 1fr"}
              gap={2}
              alignItems={"center"}
            >
              <Box>Title</Box>
              <TextField
                value={data.typingTitle}
                onChange={(e) =>
                  setData({ ...data, typingTitle: e.target.value })
                }
              />

              <Box>
                Items
                <br />
                (newline separated)
              </Box>
              <TextField
                multiline
                value={data.typingItems.join("\n")}
                onChange={(e) =>
                  setData({ ...data, typingItems: e.target.value.split("\n") })
                }
              />
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Background image
            </Typography>
            <MediaPicker
              mediaId={data.backgroundImage}
              onChange={(id) => setData({ ...data, backgroundImage: id ?? "" })}
            />
          </CardContent>
        </Card>
      </Stack>
      <Grow in={didHomeChange}>
        <Box
          position="fixed"
          bottom={0}
          right={0}
          marginBottom={4}
          marginRight={4}
        >
          <Fab color="primary" aria-label="save" onClick={saveHome}>
            <SaveIcon />
          </Fab>
        </Box>
      </Grow>
    </>
  );
};

export default Home;
