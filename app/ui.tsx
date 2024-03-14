"use client";

import SearchInput from "components/search-input";
import Spacer from "components/spacer";
import Todo from "components/todo";
import { Button, List, ListItem } from "components/material-tailwind";
import { Add } from "@mui/icons-material";
import { useState } from "react";

import { Database } from "types_db";
export type TodoRow = Database["public"]["Tables"]["todo"]["Row"];

export default function UI() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Test",
      completed: false,
    },
  ]);

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const addTodo = () => {
    setTodos((prev) => [
      ...prev,
      {
        id: prev.length + Math.floor(Math.random() * 1000),
        title: "New Todo",
        completed: false,
      },
    ]);
  };

  return (
    <main className="flex flex-col items-center px-10 py-24 w-full md:w-3/4 mx-auto">
      <h1 className="text-2xl font-bold">TODO LIST</h1>
      <Spacer height={4} />
      <SearchInput />
      <Spacer height={4} />
      <List className="w-full p-0 gap-2 mb-4">
        {todos.map((todo) => (
          <Todo key={todo.id} data={todo} removeTodo={removeTodo} />
        ))}
      </List>
      <Button
        variant="outlined"
        className="flex items-center gap-3"
        onClick={addTodo}
      >
        <Add />
        Add New TODO
      </Button>
    </main>
  );
}
