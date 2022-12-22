import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import { reorder } from "../dndHelpers";

import { Box, Container, Fab, Grid, Grow } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import DashboardLayout from "../components/DashboardLayout";
import SectionComponent from "../components/Section";
import AddSection from "../components/AddSection";
import { Section } from "../../common/sections";

const fakeSections: Section[] = [
  {
    id: "1",
    type: "paragraph",
    contents:
      "Consectetur aliqua ea culpa excepteur. Irure commodo nostrud nisi sunt ad aliquip adipisicing in culpa enim reprehenderit. Veniam dolor excepteur tempor ipsum mollit labore proident anim et consequat. Deserunt dolor duis ad esse exercitation in esse adipisicing reprehenderit.",
  },
  {
    id: "2",
    type: "paragraph",
    contents:
      "Id sit pariatur et irure ea aute ut reprehenderit aliquip voluptate enim officia mollit dolor. Officia magna sunt laboris et reprehenderit deserunt reprehenderit officia officia id ullamco. Amet commodo adipisicing irure duis labore ad est ex ad ullamco veniam sint. Ex laborum quis pariatur elit sint esse officia velit amet excepteur incididunt voluptate cillum laboris. Tempor fugiat sunt labore in ex magna magna deserunt dolor officia ex Lorem. Cillum culpa ipsum laborum duis qui ut excepteur ex.",
  },
  {
    id: "3",
    type: "header",
    header: "Ea id minim occaecat incididunt",
  },
];

const Sections: React.FC = () => {
  const [sections, _setSections] = React.useState<Section[]>(fakeSections);
  const [didSectionsChange, setDidSectionsChange] = React.useState(false);

  const setSections: React.Dispatch<React.SetStateAction<Section[]>> = (
    action
  ) => {
    setDidSectionsChange(true);
    _setSections(action);
  };

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

    setDidSectionsChange(true);

    setSections(newSectionsOrder);
  };

  const handleEditSection = (updatedSection: Section) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === updatedSection.id ? updatedSection : section
      )
    );
  };

  const handleAddSection = (section: Section) => {
    setSections((prev) => [...prev, section]);
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections((prev) => prev.filter(({ id }) => id !== sectionId));
  };

  const handleSaveSections = () => {
    console.log("TODO: handleSaveSection");
    setDidSectionsChange(false);
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
                      <SectionComponent
                        section={section}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        dragHandleProps={provided.dragHandleProps}
                        onEdit={handleEditSection}
                        onDelete={handleDeleteSection}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
      <AddSection onAddSection={handleAddSection} />

      <Grow in={didSectionsChange}>
        <Box
          position="fixed"
          bottom={0}
          right={0}
          marginBottom={4}
          marginRight={14}
        >
          <Fab color="primary" aria-label="save">
            <SaveIcon onClick={handleSaveSections} />
          </Fab>
        </Box>
      </Grow>
    </DashboardLayout>
  );
};

export default Sections;
