import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { reorder } from "../dndHelpers";
import { Section } from "../../common/sections";

import { Grid, Typography } from "@mui/material";
import SectionComponent from "../components/Section";
import AddSection from "../components/AddSection";

type Props = {
  sections: Section[];
  onChange: (sections: Section[]) => void;
};
const Sections: React.FC<Props> = ({ sections, onChange }) => {
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

    onChange(newSectionsOrder);
  };

  const handleEditSection = (updatedSection: Section) => {
    onChange(
      sections.map((section) =>
        section.id === updatedSection.id ? updatedSection : section
      )
    );
  };

  const handleAddSection = (section: Section) => {
    onChange([...sections, section]);
  };

  const handleDeleteSection = (sectionId: string) => {
    onChange(sections.filter(({ id }) => id !== sectionId));
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
    </>
  );
};

export default Sections;
