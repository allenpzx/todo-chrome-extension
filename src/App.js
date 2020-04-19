import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
// import { getData, setData } from "./utils/store";
import "./App.css";

const randomId = () => Math.random().toFixed(8).slice(2);
const PENDING_STATUS = "pending";
const FINISHED_STATUS = "finished";
const initial_state = [
  { id: randomId(), message: "pending", status: PENDING_STATUS },
  { id: randomId(), message: "finished", status: FINISHED_STATUS },
];
const storageKey = "todoList";
function setData(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}
function getData() {
  return JSON.parse(localStorage.getItem(storageKey));
}
function Init() {
  try {
    getData() || setData(initial_state);
  } catch (e) {
    console.log("Init error: ", e);
  }
}

Init();

function App() {
  const [list, setList] = useState(getData());
  const [input, setInput] = useState("");
  useEffect(() => {
    setData(list)
  }, [list]);
  const handleSubmit = (e) => {
    if (!input) return;
    setList(
      [{ id: randomId(), message: input, status: PENDING_STATUS }].concat(list)
    );
    setInput("");
  };
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleToggle = (value) => () => {
    const index = list.findIndex((v) => v.id === value.id);
    const next = list.slice();
    next[index].status =
      next[index].status === FINISHED_STATUS ? PENDING_STATUS : FINISHED_STATUS;
    setList(next);
  };

  const handleDelete = (li) => (e) => {
    setList(list.filter((v) => v.id !== li.id));
  };

  function generateListItem(v) {
    return (
      <ListItem
        key={v.id}
        role={undefined}
        dense
        button
        onClick={handleToggle(v)}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={v.status === FINISHED_STATUS}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText
          primary={v.message}
          className={v.status === FINISHED_STATUS ? "finished-item" : ""}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={handleDelete(v)}
          >
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  return (
    <div className="App">
      <div className="inputWrap">
        <TextField
          value={input}
          onChange={handleInput}
          label="todo"
          className="todo-input"
          variant="outlined"
          size="small"
        />
        <Button
          id="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          todo
        </Button>
      </div>
      <List>
        {list.filter((v) => v.status === PENDING_STATUS).map(generateListItem)}
        {list.filter((x) => x.status === FINISHED_STATUS).map(generateListItem)}
      </List>
    </div>
  );
}

export default App;
