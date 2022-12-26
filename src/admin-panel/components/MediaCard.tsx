import React from "react";

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

type Props = {
  file: File;
};
const MediaCard: React.FC<Props> = ({ file }) => {
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = () => {
    console.log("TODO");
  };

  return (
    <>
      <Card>
        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={URL.createObjectURL(file)}
            style={{
              height: 200,
              objectFit: "contain",
              maxWidth: "100%",
            }}
            alt="uploaded media"
          />
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", pl: 3 }}>
          <Typography>{file.name}</Typography>
          <IconButton onClick={() => setDeleteModalOpen(true)}>
            <DeleteForeverIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <DialogContent>
          <Typography>Are you sure, you want to remove {file.name}?</Typography>
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

export default MediaCard;
