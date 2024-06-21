import { ITypeItem } from "@/libs/interfaces";
import Image from "next/image";
import React from "react";

interface Props {
  data: ITypeItem;
}

const TypeItem: React.FC<Props> = ({ data }) => {
  return (
    <div className="type__item">
      <Image src={data.image} alt={data.type_name} height={24} width={24} />
      <h2>{data.type_name}</h2>
    </div>
  );
};

export default TypeItem;
