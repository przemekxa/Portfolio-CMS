import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import { reorder } from "../dndHelpers";

import { Box, Container, Fab, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import DashboardLayout from "../components/DashboardLayout";
import Section from "../components/Section";

const fakeSections = [
  {
    id: 1,
    text: "Consectetur aliqua ea culpa excepteur. Irure commodo nostrud nisi sunt ad aliquip adipisicing in culpa enim reprehenderit. Veniam dolor excepteur tempor ipsum mollit labore proident anim et consequat. Deserunt dolor duis ad esse exercitation in esse adipisicing reprehenderit.",
  },
  {
    id: 2,
    text: "Id sit pariatur et irure ea aute ut reprehenderit aliquip voluptate enim officia mollit dolor. Officia magna sunt laboris et reprehenderit deserunt reprehenderit officia officia id ullamco. Amet commodo adipisicing irure duis labore ad est ex ad ullamco veniam sint. Ex laborum quis pariatur elit sint esse officia velit amet excepteur incididunt voluptate cillum laboris. Tempor fugiat sunt labore in ex magna magna deserunt dolor officia ex Lorem. Cillum culpa ipsum laborum duis qui ut excepteur ex.",
  },
  {
    id: 3,
    text: "Ea id minim occaecat incididunt labore elit anim minim velit elit adipisicing amet aute anim.",
  },
];

const Sections: React.FC = () => {
  const [sections, setSections] = React.useState(fakeSections);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newSectionsOrder = reorder(
      sections,
      result.source.index,
      result.destination.index
    );

    setSections(newSectionsOrder);
  };

  return (
    <DashboardLayout>
      <Container>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sectionsList">
            {(provided) => (
              <Grid
                container
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {sections.map((section, index) => (
                  <Draggable
                    draggableId={section.id.toString()}
                    index={index}
                    key={section.id}
                  >
                    {(provided) => (
                      <Section
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        dragHandleProps={provided.dragHandleProps}
                        onDelete={() =>
                          setSections((prev) =>
                            prev.filter(({ id }) => id !== section.id)
                          )
                        }
                      >
                        <Typography>{section.text}</Typography>
                      </Section>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
      <Box
        position="fixed"
        bottom={0}
        right={0}
        marginBottom={4}
        marginRight={4}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </DashboardLayout>
  );
};

export default Sections;
