import React from "react";

const UserHeader = ({ title, subDescript }) => {
  return (
    <div style={{ borderBottom: "1px solid lightgray", paddingBottom: "10px" }}>
      <h2 style={{ marginTop: "10px" }}>{title}</h2>
      <div style={{ fontSize: "0.8em", marginTop: "10px", color: "gray" }}>
        {subDescript}
      </div>
    </div>
  );
};

export default UserHeader;
