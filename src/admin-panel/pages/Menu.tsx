import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { MenuItem } from "../../common/menu";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardActions, CardContent, Fab, Grid, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { reorder } from "../dndHelpers";

const Menu: React.FC = () => {
  const navigate = useNavigate();

  const [list, setList] = useState<MenuItem[]>([]);

  const loadMenu = async () => {
    const reply = await fetch("http://localhost:3001/api/menu", { credentials: "include" });
    if(reply.ok) {
      const json: MenuItem[] = await reply.json();
      setList(json);
    } else {
      navigate("/auth");
    }
  }

  const saveMenu = async () => {
    const reply = await fetch(
      "http://localhost:3001/api/menu", 
      { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(list)
      }
    );
    alert(reply.ok ? "Saved" : "Cannot save menu");
  }

  const onTitleChange = (id: string, title: string) => {
    setList(
      list.map((element) => {
        return element.id === id
          ? { ...element, title: title}
          : { ...element }
      })
    );
  };

  const onHrefChange = (id: string, href: string) => {
    setList(
      list.map((element) => {
        return element.id === id
          ? { ...element, href: href}
          : { ...element }
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
  }, []);

  return <DashboardLayout>
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
              {
                list.map((item: MenuItem, index) =>
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
                      <Card >
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <h4>{item.id} – {item.title}</h4>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField id="title" label="Title" value={item.title} onChange={(e) => onTitleChange(item.id, e.target.value)} fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField id="href" label="Href" value={item.href} onChange={(e) => onHrefChange(item.id, e.target.value)} fullWidth />
                            </Grid>
                          </Grid>
                        </CardContent>
                        <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
                          <IconButton {...provided.dragHandleProps}>
                            <OpenWithIcon />
                          </IconButton>
                          <IconButton onClick={() => setList(list => list.filter(element => element.id !== item.id))}>
                            <DeleteForeverIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  )}
                  </Draggable>
                )
              }
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
        <Button onClick={saveMenu}>Save</Button>
        <Button onClick={loadMenu}>Restore</Button>
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
            onClick={() => setList((list) => [...list, {id: list.length.toString(), title: "", href: ""}])}
          >
            <AddIcon />
          </Fab>
      </Box>
    </DragDropContext>
  </DashboardLayout>;
};

export default Menu;
