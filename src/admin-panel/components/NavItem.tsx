import React from "react";
import { Box, Button, ListItem } from "@mui/material";

type Props = {
  href: string;
  icon: React.ReactNode;
  title: string;
};
const NavItem: React.FC<Props> = ({ href, icon, title }) => {
  const active = false; // href ? (router.pathname === href) : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
    >
      <Button
        component="a"
        startIcon={icon}
        disableRipple
        sx={{
          backgroundColor: active ? "rgba(255,255,255, 0.08)" : undefined,
          borderRadius: 1,
          color: active ? "secondary.main" : "neutral.300",
          fontWeight: active ? "fontWeightBold" : undefined,
          justifyContent: "flex-start",
          px: 3,
          textAlign: "left",
          textTransform: "none",
          width: "100%",
          "& .MuiButton-startIcon": {
            color: active ? "secondary.main" : "neutral.400",
          },
          "&:hover": {
            backgroundColor: "rgba(255,255,255, 0.08)",
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
      </Button>
    </ListItem>
  );
};

export default NavItem;
