import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Section, sectionTypes } from "../../common/sections";
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
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const [modalOpen, setModalOpen] = React.useState(false);
  const [section, setSection] = React.useState(value);

  const handleClose = () => setModalOpen(false);

  const handleEdit = () => {
    onEdit(section);
    handleClose();
  };

  const sectionType = sectionTypes.find((sType) => sType.type === section.type);

  return (
    <>
      <Box sx={{ cursor: "pointer" }} onClick={() => setModalOpen(true)}>
        {children}
      </Box>
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>{`Edit ${sectionType?.name}`}</DialogTitle>
        <DialogContent sx={{ minWidth: isUpMd ? "50vw" : "80vw" }}>
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
