import React, { useEffect } from "react";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { ImageMetadata } from "../../common/image";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const IMAGE_SIZE = 164;

type Props = {
  mediaId: string | null;
  onChange?: (mediaId: string | null) => void;
};
const MediaPicker: React.FC<Props> = ({ mediaId, onChange }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const { data: mediaList } = useSWR<ImageMetadata[]>("/api/image");
  const [selected, setSelected] = React.useState<string | null>(mediaId);
  const [modalOpen, setModalOpen] = React.useState(false);

  useEffect(() => {
    setSelected(mediaId);
  }, [mediaId]);

  const SelectedMedia = () => (
    <Card sx={{ width: IMAGE_SIZE + 60 }}>
      <CardMedia
        component="img"
        src={`/api/image/${selected}`}
        height={IMAGE_SIZE}
        onClick={() => setModalOpen(true)}
        sx={{ cursor: "pointer" }}
      />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button color="error" onClick={() => handleSelect(null)}>
          Clear
        </Button>
      </CardActions>
    </Card>
  );
  const PickerButton = () => (
    <Button onClick={() => setModalOpen(true)}>Select Media</Button>
  );

  const mediaAvailable = mediaList && mediaList.length > 0;
  const handleCloseModal = () => setModalOpen(false);

  const handleSelect = (mediaId: string | null) => {
    setSelected(mediaId);
    onChange?.(mediaId);
    handleCloseModal();
  };

  return (
    <>
      {selected ? <SelectedMedia /> : <PickerButton />}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Select Media</DialogTitle>
        <DialogContent sx={{ justifyContent: "center", height: 450 }}>
          {mediaAvailable ? (
            <ImageList cols={isUpSm ? 3 : 1} rowHeight={IMAGE_SIZE}>
              {mediaList.map((media) => (
                <ImageListItem
                  key={media.id}
                  onClick={() => handleSelect(media.id)}
                >
                  <img
                    style={{
                      width: IMAGE_SIZE,
                      height: IMAGE_SIZE,
                      display: "block",
                      objectFit: "cover",
                    }}
                    src={`/api/image/${media.id}`}
                    alt={media.filename}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <Box
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              textAlign="center"
            >
              <Typography variant="h3" color="lightgray">
                Nothing here...
              </Typography>
              <Typography variant="h3" color="lightgray">
                Upload some images!
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={() => navigate("/media")}>
            Upload
          </Button>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MediaPicker;
