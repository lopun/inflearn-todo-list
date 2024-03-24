"use client";

import { Add } from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as todoActions from "actions/todoActions";
import { Button, List } from "components/material-tailwind";
import SearchInput from "components/search-input";
import Spacer from "components/spacer";
import Todo from "components/todo";

import { queryClient } from "config/ReactQueryClientProvider";
import { useState } from "react";

export default function UI() {
  const [search, setSearch] = useState("");

  const todosQuery = useQuery({
    queryKey: ["todos", search],
    queryFn: () => todoActions.getTodos({ search }),
  });

  const createTodoMutation = useMutation({
    mutationFn: () =>
      todoActions.createTodo({
        title: "New Todo Item",
        completed: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: (todo: todoActions.TodoRowUpdate) =>
      todoActions.updateTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => todoActions.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <main className="flex flex-col items-center px-10 py-24 w-full md:w-3/4 mx-auto">
      <h1 className="text-2xl font-bold">TODO LIST</h1>
      <Spacer height={4} />
      <SearchInput search={search} setSearch={setSearch} />
      <Spacer height={4} />
      {todosQuery.data && (
        <List className="w-full p-0 gap-2 mb-4">
          {todosQuery.data.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              updateTodoMutation={updateTodoMutation}
              deleteTodoMutation={deleteTodoMutation}
            />
          ))}
        </List>
      )}
      <Button
        variant="outlined"
        className="flex items-center gap-3"
        onClick={() => createTodoMutation.mutate()}
      >
        <Add />
        Add New TODO
      </Button>
    </main>
  );
}
