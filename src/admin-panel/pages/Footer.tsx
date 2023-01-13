import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionFetch } from "../checkSessionFetch";
import { Footer } from "../../common/footer";

import {
  Card,
  CardContent,
  TextField,
  Typography,
  Grow,
  Box,
  Fab,
  Stack,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const FooterPage: React.FC = () => {
  const navigate = useNavigate();
  const sessionFetch = useMemo(() => getSessionFetch(navigate), [navigate]);

  const [data, _setData] = useState<Footer>({ copyright: "" });
  const [didFooterChange, setDidFooterChange] = React.useState(false);

  const setData = (action: React.SetStateAction<Footer>) => {
    setDidFooterChange(true);
    _setData(action);
  };

  const loadFooter = useCallback(async () => {
    try {
      const data = await sessionFetch("/api/footer");
      setData(data);
      setDidFooterChange(false);
    } catch (error) {
      // TODO
      console.error(error);
    }
  }, [sessionFetch]);

  const saveFooter = async () => {
    try {
      await sessionFetch("/api/footer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setDidFooterChange(false);
    } catch (error) {
      // TODO
      console.error(error);
    }
  };

  useEffect(() => {
    loadFooter();
  }, [loadFooter]);

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h1">Footer</Typography>
        <Card>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Copyright text
            </Typography>
            <TextField
              fullWidth
              multiline
              value={data.copyright}
              onChange={(e) => setData({ ...data, copyright: e.target.value })}
            />
          </CardContent>
        </Card>
      </Stack>
      <Grow in={didFooterChange}>
        <Box
          position="fixed"
          bottom={0}
          right={0}
          marginBottom={4}
          marginRight={4}
        >
          <Fab color="primary" aria-label="save" onClick={saveFooter}>
            <SaveIcon />
          </Fab>
        </Box>
      </Grow>
    </>
  );
};

export default FooterPage;
