import React from "react";
import useSWR from "swr";
import { Link, useNavigate } from "react-router-dom";
import { pagesPrefix } from "../router";

import { Box, Divider, Drawer, useMediaQuery, Theme } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
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

  const { data: pages } = useSWR<Page[]>(
    "/api/pages",
    getSessionFetch(navigate)
  );

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
          <Link to="/">
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
        {/* <NavItem
          icon={<HomeIcon />}
          href={`${pagesPrefix}/Home`}
          title={"Home"}
        /> */}
        {pages?.map((page) => (
          <NavItem
            key={page.id}
            icon={<ArticleIcon />}
            href={`${pagesPrefix}/${page.id}`}
            title={page.title}
          />
        ))}
        <NavItem
          icon={<ControlPointIcon />}
          href="/pages/new"
          title="New Page"
        />
      </Box>
      <CustomDivider />
      <Box sx={{ marginBottom: 3 }}>
        <NavItem icon={<NearMeIcon />} href="/menu" title="Menu" />
        <NavItem icon={<PhotoCameraIcon />} href="/media" title="Media" />
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
