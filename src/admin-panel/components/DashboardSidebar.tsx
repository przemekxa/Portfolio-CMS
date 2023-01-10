import React from "react";
import useSWR from "swr";
import { Link, useNavigate } from "react-router-dom";
import { pagesPrefix } from "../router";

import { Box, Divider, Drawer, useMediaQuery, Theme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NearMeIcon from "@mui/icons-material/NearMe";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ArticleIcon from "@mui/icons-material/Article";
import Logo from "./Logo";
import NavItem from "./NavItem";
import { getSessionFetch } from "../checkSessionFetch";
import { Page } from "../../common/pages";

const CustomDivider = () => (
  <Divider
    sx={{
      borderColor: "#2D3748",
      my: 3,
    }}
  />
);

type Props = {
  onClose: () => void;
  open: boolean;
};
const DashboardSidebar: React.FC<Props> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const lgUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const { data: pages, mutate } = useSWR<Page[]>("/api/pages");

  const handleDeletePage = async (pageId: string) => {
    try {
      await getSessionFetch(navigate)(`/api/pages/${pageId}`, {
        method: "DELETE",
      });
      mutate(pages?.filter(({ id }) => id !== pageId));
    } catch (error) {
      // TODO
      console.error(error);
    }
  };

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div>
        <Box sx={{ p: 3 }}>
          <Link to="/pages">
            <Logo
              sx={{
                height: 42,
                width: 42,
              }}
            />
          </Link>
        </Box>
      </div>

      <CustomDivider />
      <Box sx={{ flexGrow: 1 }}>
        <NavItem
          onClick={onClose}
          icon={<HomeIcon />}
          href={pagesPrefix}
          title={"Home"}
        />
        {pages?.map((page) => (
          <NavItem
            key={page.id}
            onClick={onClose}
            icon={<ArticleIcon />}
            href={`${pagesPrefix}/${page.id}`}
            title={page.title}
            onDelete={() => handleDeletePage(page.id)}
          />
        ))}
        <NavItem
          icon={<ControlPointIcon />}
          onClick={onClose}
          href="/pages/new"
          title="New Page"
        />
      </Box>
      <CustomDivider />
      <Box sx={{ marginBottom: 3 }}>
        <NavItem
          icon={<NearMeIcon />}
          href="/menu"
          title="Menu"
          onClick={onClose}
        />
        <NavItem
          icon={<PhotoCameraIcon />}
          href="/media"
          title="Media"
          onClick={onClose}
        />
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default DashboardSidebar;
