import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../common/footer";
import { getSessionFetch } from "../checkSessionFetch";

const FooterPage: React.FC = () => {
  const navigate = useNavigate();
  const sessionFetch = useMemo(
    () => getSessionFetch(navigate),
    [navigate]
  );

  const [data, setData] = useState<Footer>({ copyright: "" });

  const loadFooter = useCallback(async () => {
    try {
      const data = await sessionFetch("/api/footer");
      setData(data);
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
    } catch (error) {
      // TODO
      console.error(error);
    }
  };

  useEffect(() => {
    loadFooter();
  }, [loadFooter]);

  return <>
  <Stack spacing={2}>
    <Typography variant="h1">Footer</Typography>
    <Card>
      <CardContent>
        <Typography variant="h6" mb={2}>Copyright text</Typography>
        <TextField
          fullWidth
          multiline
          value={data.copyright}
          onChange={e => setData({...data, copyright: e.target.value}) }
        />
      </CardContent>
    </Card>

    <Stack direction={"row"} spacing={2}>
      <Button variant={"contained"} onClick={saveFooter}>Save</Button>
      <Button variant={"outlined"} onClick={loadFooter}>Restore</Button>
    </Stack>
    
  </Stack>
  </>;
};

export default FooterPage;
