import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { reorder } from "../dndHelpers";
import { getSessionFetch } from "../checkSessionFetch";
import { MenuItem } from "../../common/menu";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Fab,
  Grid,
  Grow,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import OpenWithIcon from "@mui/icons-material/OpenWith";

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const sessionFetch = React.useMemo(
    () => getSessionFetch(navigate),
    [navigate]
  );

  const [list, _setList] = useState<MenuItem[]>([]);
  const [didMenuChange, setDidMenuChange] = React.useState(false);

  const setList = (action: React.SetStateAction<MenuItem[]>) => {
    setDidMenuChange(true);
    _setList(action);
  };

  const loadMenu = React.useCallback(async () => {
    try {
      const data = await sessionFetch("/api/menu");
      setList(data);
      setDidMenuChange(false);
    } catch (error) {
      // TODO
      console.error(error);
    }
  }, [sessionFetch]);

  const saveMenu = async () => {
    try {
      await sessionFetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(list),
      });
      setDidMenuChange(false);
    } catch (error) {
      // TODO
      console.error("Cannot save menu: ", error);
    }
  };

  const onTitleChange = (id: string, title: string) => {
    setList(
      list.map((element) => {
        return element.id === id
          ? { ...element, title: title }
          : { ...element };
      })
    );
  };

  const onHrefChange = (id: string, href: string) => {
    setList(
      list.map((element) => {
        return element.id === id ? { ...element, href: href } : { ...element };
      })
    );
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedList = reorder(
      list,
      result.source.index,
      result.destination.index
    );

    setList(reorderedList);
  };

  useEffect(() => {
    loadMenu();
  }, [loadMenu]);

  return (
    <>
      <Typography variant="h1" mb={2}>
        Menu
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          <Droppable droppableId="menuList">
            {(provided) => (
              <Grid
                container
                spacing={2}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.map((item: MenuItem, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Grid
                        item
                        xs={12}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <Card>
                          <CardContent>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <h4>
                                  {item.id} – {item.title}
                                </h4>
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="title"
                                  label="Title"
                                  value={item.title}
                                  onChange={(e) =>
                                    onTitleChange(item.id, e.target.value)
                                  }
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="href"
                                  label="Href"
                                  value={item.href}
                                  onChange={(e) =>
                                    onHrefChange(item.id, e.target.value)
                                  }
                                  fullWidth
                                />
                              </Grid>
                            </Grid>
                          </CardContent>
                          <CardActions
                            disableSpacing
                            sx={{ justifyContent: "flex-end" }}
                          >
                            <IconButton {...provided.dragHandleProps}>
                              <OpenWithIcon />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                setList((list) =>
                                  list.filter(
                                    (element) => element.id !== item.id
                                  )
                                )
                              }
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </Grid>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </Grid>
        <Box
          position="fixed"
          display="flex"
          flexDirection="row"
          gap={3}
          bottom={0}
          right={0}
          marginBottom={4}
          marginRight={4}
        >
          <Grow in={didMenuChange}>
            <Fab color="primary" aria-label="save" onClick={saveMenu}>
              <SaveIcon />
            </Fab>
          </Grow>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() =>
              setList((list) => [
                ...list,
                { id: list.length.toString(), title: "", href: "" },
              ])
            }
          >
            <AddIcon />
          </Fab>
        </Box>
      </DragDropContext>
    </>
  );
};

export default Menu;
