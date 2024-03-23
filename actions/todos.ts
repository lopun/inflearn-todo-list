"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

// 할 일 목록을 가져오는 함수
export const getTodos = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("todo").select("*");
  return { data, error };
};

// 새로운 할 일을 생성하는 함수
export const createTodo = async ({ title, completed }) => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("todo").insert({
    title,
    completed,
    created_at: new Date(),
    updated_at: new Date(),
  });
  return { data, error };
};

// 할 일을 업데이트하는 함수
export const updateTodo = async ({ id, title, completed }) => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("todo")
    .update({
      title,
      completed,
      updated_at: new Date(),
    })
    .eq("id", id);
  return { data, error };
};

// 할 일을 삭제하는 함수
export const deleteTodo = async (id) => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("todo").delete().eq("id", id);
  return { data, error };
};
