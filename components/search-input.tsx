"use client";

import { Input } from "components/material-tailwind";
import { useState } from "react";

export default function SearchInput({ search, setSearch }) {
  return (
    <Input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      label="Search Todo"
      icon={<i className="fas fa-search" />}
    />
  );
}
