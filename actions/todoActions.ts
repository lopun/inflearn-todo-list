"use server";

import { Database } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";

export type TodoRow = Database["public"]["Tables"]["todo"]["Row"];
export type TodoRowCreate = Omit<TodoRow, "id" | "created_at" | "updated_at">;
export type TodoRowUpdate = Omit<TodoRow, "created_at" | "updated_at">;

const handleError = (error) => {
  if (error) {
    console.error(error);
    throw Error(error.message);
  }
};

// 할 일 목록을 가져오는 함수
export const getTodos = async ({ search }): Promise<TodoRow[]> => {
  const supabase = await createServerSupabaseClient();
  let query = supabase.from("todo").select("*");
  if (search && search !== "") {
    query = query.like("title", `%${search}%`);
  }
  query = query.order("created_at", { ascending: true });
  const { data, error } = await query;

  handleError(error);
  return data;
};

// 새로운 할 일을 생성하는 함수
export const createTodo = async ({ title, completed }: TodoRowCreate) => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("todo").insert({
    title,
    completed,
    created_at: new Date(),
    updated_at: new Date(),
  });
  handleError(error);
  return data;
};

// 할 일을 업데이트하는 함수
export const updateTodo = async ({ id, title, completed }: TodoRowUpdate) => {
  console.log({ id, title, completed });
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("todo")
    .update({
      title,
      completed,
      updated_at: new Date(),
    })
    .eq("id", id);
  console.log({ data });
  handleError(error);
  return data;
};

// 할 일을 삭제하는 함수
export const deleteTodo = async (id) => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("todo").delete().eq("id", id);
  handleError(error);
  return data;
};
