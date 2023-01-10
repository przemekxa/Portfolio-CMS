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
  Divider,
  Fab,
  FormControl,
  FormLabel,
  Grow,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DashboardLayout from "../components/DashboardLayout";
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
    return (
      <DashboardLayout>
        <CircularProgress />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Card>
        <CardContent>
          <Box display={"flex"} flexWrap="wrap" gap={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <TextField value={page.title} onChange={handleTitleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Id</FormLabel>
              <TextField disabled value={slugify(page.title)} />
            </FormControl>
          </Box>
        </CardContent>
      </Card>
      <Divider sx={{ my: 5 }} />
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
    </DashboardLayout>
  );
};

export default PagePage;
