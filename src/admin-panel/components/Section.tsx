import React, { PropsWithChildren } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import EditIcon from "@mui/icons-material/Edit";

interface Props extends PropsWithChildren {
  onDelete?: () => void;
}

const Section: React.FC<Props> = ({ children, onDelete }) => {
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }

    handleCloseDeleteModal();
  };

  return (
    <>
      <Card sx={{ width: "100%" }}>
        <CardContent>{children}</CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <IconButton>
            <OpenWithIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => setDeleteModalOpen(true)}>
            <DeleteForeverIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <DialogContent>
          <Typography>
            Are you sure, you want to remove this section?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDeleteModal}>
            No, I want it
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Section;
