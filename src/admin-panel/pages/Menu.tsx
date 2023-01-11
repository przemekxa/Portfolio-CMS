import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Fab,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { reorder } from "../dndHelpers";
import { getSessionFetch } from "../checkSessionFetch";
import { MenuItem } from "../../common/menu";

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const sessionFetch = React.useMemo(
    () => getSessionFetch(navigate),
    [navigate]
  );

  const [list, setList] = useState<MenuItem[]>([]);

  const loadMenu = React.useCallback(async () => {
    try {
      const data = await sessionFetch("/api/menu");
      setList(data);
    } catch (error) {
      // TODO
      console.error(error);
    }
  }, [sessionFetch]);

  const saveMenu = async () => {
    const reply = await sessionFetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(list),
    });
    alert(reply.ok ? "Saved" : "Cannot save menu");
    // TODO
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
      <Typography variant="h1" mb={2}>Menu</Typography>
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
          <Stack direction={"row"} spacing={2} mt={2}>
            <Button variant={"contained"} onClick={saveMenu}>Save</Button>
            <Button variant={"outlined"} onClick={loadMenu}>Restore</Button>
          </Stack>
        </Grid>
        <Box
          position="fixed"
          bottom={0}
          right={0}
          marginBottom={4}
          marginRight={4}
        >
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
