import React from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

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
import { Section, sectionTypes } from "../../common/sections";
import SectionData from "./SectionData";
import EditSectionModal from "./EditSectionModal";

type Props = {
  section: Section;
  onEdit: (section: Section) => void;
  onDelete: (id: string) => void;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  // other draggable props
};

const SectionComponent = React.forwardRef<any, Props>(
  ({ section, onEdit, onDelete, dragHandleProps, ...props }, ref) => {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

    const handleCloseDeleteModal = () => setDeleteModalOpen(false);

    const handleDelete = () => {
      onDelete(section.id);

      handleCloseDeleteModal();
    };

    return (
      <>
        <Card ref={ref} sx={{ width: "100%", marginBottom: 2 }} {...props}>
          <CardContent>
            <Typography variant="h6" mb={2}>
              {sectionTypes.find(s => s.type === section.type)?.name ?? "Unknown"}
            </Typography>
            <SectionData section={section} />
          </CardContent>
          <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
            <IconButton {...dragHandleProps}>
              <OpenWithIcon />
            </IconButton>
            <EditSectionModal value={section} onEdit={onEdit}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </EditSectionModal>
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
  }
);

export default SectionComponent;
