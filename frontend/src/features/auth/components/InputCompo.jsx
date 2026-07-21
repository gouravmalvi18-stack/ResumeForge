import React from "react";

const InputCompo = ({ labelName, InputType, Placeholder }) => {
  return (
    <div className="flex w-full flex-col gap-2 px-5">
      <label className="text-sm font-bold tracking-wide text-neutral-300 pl-1">
        {labelName} <span className="text-red-500">*</span>
      </label>
      <input
        type={InputType}
        placeholder={Placeholder}
        className="rounded-lg border-[0.5px] border-white/30 px-3 py-2 text-sm font-bold text-neutral-200 placeholder-neutral-600 hover:cursor-pointer focus:outline-[0.5px] focus:outline-neutral-300"
      />
    </div>
  );
};

export default InputCompo;
