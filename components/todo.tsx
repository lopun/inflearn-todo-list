"use client";

import { EditOutlined, CheckOutlined } from "@mui/icons-material";
import { useState } from "react";
import {
  Checkbox,
  IconButton,
  Input,
  ListItem,
  ListItemSuffix,
  Typography,
} from "components/material-tailwind";

type TodoProps = {
  data: any;
  removeTodo: (id: number) => void;
};

export default function Todo({ data, removeTodo }: TodoProps) {
  const [isEditing, setIsEditing] = useState(!!data.title);
  const [completed, setCompleted] = useState(data.completed);
  const [title, setTitle] = useState(data.title);

  const onSave = () => {
    setIsEditing((prev) => !prev);
    setTitle(title);
  };

  return (
    <ListItem
      ripple={false}
      className="w-full p-0 flex items-center justify-between hover:bg-white focus:bg-white active:bg-white"
    >
      <Checkbox
        className="grow"
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      {isEditing ? (
        <Input
          variant="static"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full text-xl font-medium border-indigo-700`}
        />
      ) : (
        <Typography
          className={`text-xl font-medium ${completed && "line-through"}`}
        >
          {title}
        </Typography>
      )}
      <ListItemSuffix className="flex items-center gap-2">
        {isEditing ? (
          <IconButton
            variant="outlined"
            onClick={onSave}
            ripple={true}
            className="aspect-square"
          >
            <i className="fas fa-check" />
          </IconButton>
        ) : (
          <IconButton
            variant="outlined"
            onClick={() => setIsEditing((prev) => !prev)}
            ripple={true}
            className="aspect-square"
          >
            <i className="fas fa-pen" />
          </IconButton>
        )}
        <IconButton
          variant="outlined"
          onClick={() => removeTodo(data.id)}
          ripple={true}
          className="aspect-square"
        >
          <i className="fas fa-trash" />
        </IconButton>
      </ListItemSuffix>
    </ListItem>
  );
}
