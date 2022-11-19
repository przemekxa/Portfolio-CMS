import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserCircleIcon from "../icons/UserCircle";
import AccountPopover from "./AccountPopover";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

type Props = {
  onSidebarOpen: () => void;
};
const DashboardNavbar: React.FC<Props> = ({ onSidebarOpen }) => {
  const settingsRef = React.useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = React.useState(false);

  const fakeAccount = { name: "Admin" };

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
              ml: 1,
            }}
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        anchorEl={settingsRef.current!}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
        accountName={fakeAccount.name}
      />
    </>
  );
};

export default DashboardNavbar;
