import React from "react";
import { KeyedMutator } from "swr";

import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ImageMetadata } from "../../common/image";
import { useNavigate } from "react-router-dom";
import { getSessionFetch } from "../checkSessionFetch";

type Props = {
  image: ImageMetadata,
  mutate: KeyedMutator<ImageMetadata[]>
};
const MediaCard: React.FC<Props> = ({ image, mutate }) => {
  const navigate = useNavigate();
  const sessionFetch = React.useMemo(
    () => getSessionFetch(navigate),
    [navigate]
  );

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = async () => {
    try {
      await sessionFetch(`/api/image/${image.id}`, {
        method: "DELETE"
      });
      mutate(images => images?.filter(i => i.id !== image.id));
    } catch (error) {
      // TODO
      console.error(error);
    }
    setDeleteModalOpen(false);
  };

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          src={`/api/image/${image.id}`}
          height={200}
        />
        <CardActions sx={{ justifyContent: "space-between", pl: 3 }}>
          <Typography>{image.filename}</Typography>
          <IconButton onClick={() => setDeleteModalOpen(true)}>
            <DeleteForeverIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <DialogContent>
          <Typography>Are you sure, you want to remove {image.filename}?<br />(ID: {image.id})</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDeleteModal}>
            Cancel
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
