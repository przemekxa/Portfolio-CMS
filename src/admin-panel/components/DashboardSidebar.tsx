import React from "react";
import { Link } from "react-router-dom";

import { Box, Divider, Drawer, useMediaQuery, Theme } from "@mui/material";
import ChartBarIcon from "../icons/ChartBar";
import CogIcon from "../icons/Cog";
import Logo from "./Logo";
import NavItem from "./NavItem";

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },

  {
    href: "/settings",
    icon: <CogIcon fontSize="small" />,
    title: "Settings",
  },
];

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
    <>
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
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
      </Box>
    </>
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
