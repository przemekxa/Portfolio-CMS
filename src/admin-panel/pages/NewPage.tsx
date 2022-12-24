import React from "react";
import slugify from "slugify";

import { Box, Divider, FormControl, FormLabel, TextField } from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";
import Sections from "../components/Sections";

const NewPage: React.FC = () => {
  const [name, setName] = React.useState("");
  const slug = slugify(name);

  return (
    <DashboardLayout>
      <Box display={"flex"} flexWrap="wrap" gap={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <TextField value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Slug</FormLabel>
          <TextField disabled value={slug} />
        </FormControl>
      </Box>
      <Divider sx={{ my: 5 }} />
      <Sections sections={[]} />
    </DashboardLayout>
  );
};

export default NewPage;
