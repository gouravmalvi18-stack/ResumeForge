import React from "react";

const BtnCompo = ({ BtnType, Name, className }) => {
  return (
    <button type={BtnType} className={className}>
      {Name}
    </button>
  );
};

export default BtnCompo;
