/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const DropDown = ({title, options, func }) => {
  return (
    <div className= {`select overflow-hidden `} >
      <select
        onChange={func}
        className=" p-[.3vw] text-zinc-400 bg-black text-[1vw] rounded-sm outline-none uppercase"
        name="format"
        id="format"
      >
        <option
          hidden
        >
          {title}
        </option>
        {options.map((option, idx) => (
          <option
            key={idx}
            value={option.toLowerCase()}
            className="text-zinc-400 bg-slate-800 text-[1.1vw] uppercase"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
