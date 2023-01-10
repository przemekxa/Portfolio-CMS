import React, { MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type Props = {
  href: string;
  icon: React.ReactNode;
  title: string;
  onDelete?: () => void;
};
const NavItem: React.FC<Props> = ({ href, icon, title, onDelete }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const active = location.pathname === href;
  const handleDelete = async (event: MouseEvent) => {
    await onDelete?.();
    setDeleteModalOpen(false);
    if (active) {
      navigate("/pages");
    }
  };

  return (
    <Stack display="flex" flexDirection="row">
      <Link to={href} style={{ textDecorationLine: "none", flexGrow: 1 }}>
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
      </Link>
      {onDelete && (
        <Box sx={{ minWidth: 32, mr: 1 }}>
          <IconButton size="small" onClick={() => setDeleteModalOpen(true)}>
            <DeleteOutlineIcon />
          </IconButton>
          <Dialog
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
          >
            <DialogContent>
              <Typography>
                Are you sure, you want to remove <b>{title}</b> page?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setDeleteModalOpen(false)}
              >
                No, I want it
              </Button>
              <Button variant="contained" onClick={handleDelete}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Stack>
  );
};

export default NavItem;
