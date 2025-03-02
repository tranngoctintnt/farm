import React from "react";
import "../Search/style.css";
import { Button } from "@mui/material";
import { IoSearchSharp } from "react-icons/io5";

const Search = () => {
  return (
    <div className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[6px] relative p-2">
      <input
        type="text"
        placeholder="Search for product..."
        className="w-full h-[35px] focus:outline-none bg-inherit text-[15px  ]"
      />
      <Button className="!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] !h-[35px] !rounded-full text-black">
        <IoSearchSharp className="text-[22px] text-[#5e5c5c]" />
      </Button>
    </div>
  );
};
export default Search;
