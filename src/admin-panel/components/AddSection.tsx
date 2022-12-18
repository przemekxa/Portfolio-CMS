import React from "react";

import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  Fab,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddSection: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

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
        <DialogContent>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 2, md: 4 }}
          >
            {Array.from(Array(6)).map((_, index) => (
              <Grid item key={index}>
                <Card elevation={10}>
                  <CardContent>smth</CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddSection;
