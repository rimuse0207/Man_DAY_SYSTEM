import React from "react";

const SelectInput = ({ title, answer }) => {
  return (
    <div className="Input_GR">
      <div className="Title">{title}</div>
      <div className="Answer" style={{ textAlign: "center" }}>
        {answer}
      </div>
    </div>
  );
};

export default SelectInput;
