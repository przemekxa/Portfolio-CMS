import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import { reorder } from "../dndHelpers";

import { Box, Fab, Grid, Grow, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import SectionComponent from "../components/Section";
import AddSection from "../components/AddSection";
import { Section } from "../../common/sections";

type Props = {
  sections: Section[];
};
const Sections: React.FC<Props> = ({ sections: initialSections }) => {
  const [sections, _setSections] = React.useState<Section[]>(initialSections);
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
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sectionsList">
          {(provided) => (
            <Grid
              container
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {sections.length === 0 && (
                <Typography variant="h3" color="lightgray">
                  No sections here... Try to add a new one!
                </Typography>
              )}
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
      <AddSection onAddSection={handleAddSection} />

      <Grow in={didSectionsChange}>
        <Box
          position="fixed"
          bottom={0}
          right={0}
          marginBottom={4}
          marginRight={14}
        >
          <Fab color="primary" aria-label="save" onClick={handleSaveSections}>
            <SaveIcon />
          </Fab>
        </Box>
      </Grow>
    </>
  );
};

export default Sections;
