import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { Section } from "../../common/sections";
import SectionDataEdit from "./SectionDataEdit";

interface Props extends React.PropsWithChildren {
  onEdit: (section: Section) => void;
  value: Section;
  add?: boolean;
}

const EditSectionModal: React.FC<Props> = ({
  value,
  onEdit,
  children,
  add,
}) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [section, setSection] = React.useState(value);

  const handleClose = () => setModalOpen(false);

  const handleEdit = () => {
    onEdit(section);
    handleClose();
  };

  return (
    <>
      <Box sx={{ cursor: "pointer" }} onClick={() => setModalOpen(true)}>
        {children}
      </Box>
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>Edit Section: {section.type}</DialogTitle>
        <DialogContent>
          <SectionDataEdit section={section} setSection={setSection} />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleEdit}>
            {add ? `Add section` : `Apply changes`}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditSectionModal;
