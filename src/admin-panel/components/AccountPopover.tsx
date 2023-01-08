import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, MenuItem, MenuList, Popover, Typography } from "@mui/material";

type Props = {
  anchorEl: Element;
  onClose: () => void;
  open: boolean;
  accountName: string;
};
const AccountPopover: React.FC<Props> = ({
  anchorEl,
  onClose,
  open,
  accountName,
}) => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    navigate("/signin");
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "300px" },
      }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {accountName}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

export default AccountPopover;
