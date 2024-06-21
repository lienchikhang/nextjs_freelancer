"use client";
import http, { fetching } from "@/libs/http/http";
import React, { useEffect, useState } from "react";
import TypeItem from "./TypeItem";
import { ITypeItem } from "@/libs/interfaces";

const ListType = () => {
  const [data, setData] = useState<ITypeItem[] | null>();
  useEffect(() => {
    // const data = await http.get("type/get-only");
    const fetching = async () => {
      const rs = await http.get("type/get-only");
      if (rs.status == 200) setData(rs.content);
      else setData(null);
    };
    fetching();
  }, []);

  return (
    <section className="listType">
      {data &&
        data.map((type: ITypeItem, idx: number) => {
          return <TypeItem data={type} key={idx} />;
        })}
    </section>
  );
};

export default ListType;
