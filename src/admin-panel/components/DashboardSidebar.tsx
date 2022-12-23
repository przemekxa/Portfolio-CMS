import React from "react";
import { Link } from "react-router-dom";

import { Box, Divider, Drawer, useMediaQuery, Theme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NearMeIcon from "@mui/icons-material/NearMe";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ArticleIcon from "@mui/icons-material/Article";
import Logo from "./Logo";
import NavItem from "./NavItem";

const pages = [
  {
    href: "/",
    icon: <HomeIcon />,
    title: "Home Page",
  },

  {
    href: "/sections",
    icon: <ArticleIcon />,
    title: "SectionsComponent",
  },
];

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
  const lgUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

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
        {pages.map((item) => (
          <NavItem
            key={item.title}
            icon={item.icon}
            href={item.href}
            title={item.title}
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
