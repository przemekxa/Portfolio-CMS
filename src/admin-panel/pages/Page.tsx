import React from "react";
import slugify from "slugify";
import { useParams } from "react-router-dom";
import { pages as fakePages } from "../fakeData";
import { Page } from "../../common/pages";
import { Section } from "../../common/sections";

import {
  Box,
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

const defaultEmptyPage: Page = {
  id: "",
  title: "",
  description: "",
  subpages: [],
  sections: [],
};

const getPageData = (pageId?: string) =>
  fakePages.find((page) => page.id === pageId) || defaultEmptyPage;

const PagePage: React.FC = () => {
  const { pageId } = useParams();
  const [page, _setPage] = React.useState(getPageData(pageId));
  const [didSectionsChange, setDidSectionsChange] = React.useState(false);

  const setPage: React.Dispatch<React.SetStateAction<Page>> = (action) => {
    setDidSectionsChange(true);
    _setPage(action);
  };

  React.useEffect(() => {
    _setPage(getPageData(pageId));
    setDidSectionsChange(false);
  }, [pageId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPage((prev) => ({
      ...prev,
      id: slugify(e.target.value),
      title: e.target.value,
    }));

  const handleSectionChange = (sections: Section[]) => {
    setPage((prev) => ({ ...prev, sections }));
  };

  const handleSave = () => {
    console.log("TODO: handleSaveSection");
    setDidSectionsChange(false);
  };

  return (
    <DashboardLayout>
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
