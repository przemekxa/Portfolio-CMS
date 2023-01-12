import React from "react";
import slugify from "slugify";
import { useSWRConfig } from "swr";
import { useNavigate, useParams } from "react-router-dom";
import { getSessionFetch } from "../checkSessionFetch";
import { createDefaultPage, Page } from "../../common/pages";
import { Section } from "../../common/sections";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Fab,
  FormLabel,
  Grid,
  Grow,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Sections from "../components/Sections";

const PagePage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const { pageId } = useParams();
  const isNewPage = pageId === undefined;
  const [page, _setPage] = React.useState<Page | null>(null);
  const [didSectionsChange, setDidSectionsChange] = React.useState(false);

  const setPage: React.Dispatch<React.SetStateAction<Page>> = (action) => {
    setDidSectionsChange(true);
    _setPage(action);
  };

  const sessionFetch = React.useMemo(
    () => getSessionFetch(navigate),
    [navigate]
  );

  React.useEffect(() => {
    (async () => {
      if (isNewPage) {
        _setPage(createDefaultPage());
      } else {
        try {
          const page = await sessionFetch(`/api/pages/${pageId}`);
          _setPage(page);
        } catch (error) {
          navigate("/pages/new");
        }
      }
      setDidSectionsChange(false);
    })();
  }, [isNewPage, navigate, pageId, sessionFetch]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPage((prev) => ({
      ...prev,
      id: slugify(e.target.value),
      title: e.target.value,
    }));

  const handleSectionChange = (sections: Section[]) => {
    setPage((prev) => ({ ...prev, sections }));
  };

  const handleSave = async () => {
    if (page === null) {
      return;
    }

    try {
      await sessionFetch(`/api/pages/${page.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });
      mutate("/api/pages");
      setDidSectionsChange(false);
      if (isNewPage) {
        navigate(`/pages/${page.id}`);
      }
    } catch (error) {
      // TODO
    }
  };

  if (!page) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h1" mb={2}>{page.title === "" ? "Empty page" : page.title}</Typography>
      <Card>
        <CardContent>
          <Grid container rowSpacing={4} columnSpacing={4}>
            <Grid item xs={6}>
              <Stack spacing={2}>
                <FormLabel>Title</FormLabel>
                <TextField fullWidth value={page.title} onChange={handleTitleChange} />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={2}>
                <FormLabel>ID</FormLabel>
                <TextField fullWidth disabled value={slugify(page.title)} />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={2}>
                <FormLabel>Description</FormLabel>
                <TextField 
                  fullWidth
                  multiline
                  value={page.description}
                  onChange={ e => setPage({...page, description: e.target.value}) } 
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={2}>
                <FormLabel>Subpages</FormLabel>
                TODO
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Typography variant="h3" my={4}>Sections</Typography>
      <Sections sections={page.sections} onChange={handleSectionChange} />
      <Grow in={didSectionsChange}>
        <Box
          position="fixed"
          bottom={0}
          right={0}
          marginBottom={4}
          marginRight={14}
        >
          <Fab color="primary" aria-label="save" onClick={handleSave}>
            <SaveIcon />
          </Fab>
        </Box>
      </Grow>
    </>
  );
};

export default PagePage;
