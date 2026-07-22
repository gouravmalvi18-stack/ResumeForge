import React from "react";

const BtnCompo = ({
  BtnType,
  Name,
  isSubmitting,
  WillSumbitText,
  className,
}) => {
  return (
    <button type={BtnType} disabled={isSubmitting} className={className}>
      {isSubmitting ? `${WillSumbitText}` : `${Name}`}
    </button>
  );
};

export default BtnCompo;
