import React from "react";
import "../Search/style.css";
import { Button } from "@mui/material";
import { IoSearchSharp } from "react-icons/io5";

const Search = React.memo(() => {
  return (
    <div className="searchBox w-[100%] h-[40px] bg-[#fffcfc] flex items-center rounded-[6px] relative p-2">
      <input
        type="text"
        placeholder="Search for product..."
        className="w-full h-[30px] focus:outline-none bg-inherit text-[15px]"
      />
      <Button className="!absolute top-[3px] right-[5px] z-50 !w-[37px] !min-w-[37px] !h-[35px] !rounded-full text-black">
        <IoSearchSharp className="text-[22px] text-[#5e5c5c]" />
      </Button>
    </div>
  );
});
export default Search;
