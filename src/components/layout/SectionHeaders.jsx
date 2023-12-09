import React from "react";

export default function SectionHeaders({ subHeader, mainHeader }) {
  return (
    <>
      <h3 className="uppercase text-gray-500 font-semibold">{subHeader}</h3>
      <h2 className="text-primary mt-2 font-bold text-4xl italic leading-4">
        {mainHeader}
      </h2>
    </>
  );
}
