"use client";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const SearchTitle = () => {
  const params = useSearchParams();

  return (
    <section className="search__title">
      <h2>
        Results for <span>{params.get("name") ? params.get("name") : 'All'}</span>
      </h2>
    </section>
  );
};

export default SearchTitle;
