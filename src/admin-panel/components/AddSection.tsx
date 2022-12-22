import React from "react";

import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Section, sectionTypes } from "../../common/sections";
import EditSectionModal from "./EditSectionModal";
import generateEmptySection from "../../common/defaultGenerator";

type Props = {
  onAddSection: (section: Section) => void;
};
const AddSection: React.FC<Props> = ({ onAddSection }) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleAddSection = (section: Section) => {
    onAddSection(section);
    setModalOpen(false);
  };

  return (
    <>
      <Box
        position="fixed"
        bottom={0}
        right={0}
        marginBottom={4}
        marginRight={4}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={() => setModalOpen(true)} />
        </Fab>
      </Box>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Add Section</DialogTitle>
        <DialogContent>
          <Grid container spacing={{ xs: 2, sm: 3 }} columns={12}>
            {sectionTypes.map((section) => (
              <Grid item xs={12} sm={6} key={section.type}>
                <EditSectionModal
                  add
                  onEdit={handleAddSection}
                  value={generateEmptySection(section.type)}
                >
                  <Card elevation={10}>
                    <CardContent>{section.name}</CardContent>
                  </Card>
                </EditSectionModal>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddSection;
