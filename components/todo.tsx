"use client";

import { useState } from "react";
import {
  Checkbox,
  Button,
  Input,
  ListItem,
  ListItemSuffix,
  Typography,
} from "components/material-tailwind";

export default function Todo({ todo, updateTodoMutation, deleteTodoMutation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);

  return (
    <ListItem
      ripple={false}
      className="w-full p-0 flex items-center justify-between hover:bg-white focus:bg-white active:bg-white"
    >
      <Checkbox
        className="grow"
        checked={completed}
        disabled={updateTodoMutation.isPending || deleteTodoMutation.isPending}
        onChange={async (e) => {
          setCompleted(e.target.checked);
          updateTodoMutation.mutate({
            id: todo.id,
            title,
            completed: e.target.checked,
          });
        }}
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
          <Button
            variant="outlined"
            onClick={async () => {
              await setIsEditing((prev) => !prev);
              updateTodoMutation.mutate({
                id: todo.id,
                title,
                completed,
              });
            }}
            ripple={true}
            className="py-3 px-4"
          >
            {updateTodoMutation.isPending ? (
              "Loading"
            ) : (
              <i className="fas fa-check" />
            )}
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={() => setIsEditing((prev) => !prev)}
            ripple={true}
            size="sm"
            className="py-3 px-4"
            loading={updateTodoMutation.isPending}
          >
            {updateTodoMutation.isPending ? (
              "Loading"
            ) : (
              <i className="fas fa-pen" />
            )}
          </Button>
        )}
        <Button
          variant="outlined"
          onClick={() => deleteTodoMutation.mutate(todo.id)}
          ripple={true}
          size="sm"
          className="py-3 px-4"
          loading={deleteTodoMutation.isPending}
        >
          {deleteTodoMutation.isPending ? (
            "Loading"
          ) : (
            <i className="fas fa-trash" />
          )}
        </Button>
      </ListItemSuffix>
    </ListItem>
  );
}
