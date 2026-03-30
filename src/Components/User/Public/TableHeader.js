import React from "react";

const TableHeader = ({ headerList }) => {
  return (
    <thead>
      <tr>
        {headerList.map((list) => {
          return <th key={list}>{list}</th>;
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
