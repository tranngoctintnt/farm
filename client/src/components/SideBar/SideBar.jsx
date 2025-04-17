import React, { useState } from "react";
import { Checkbox, Button } from 'antd';
import "../SideBar/style.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { Collapse } from "react-collapse";
import { IoMdArrowDropup } from "react-icons/io";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const SideBar = ({ 
  categories, 
  categoryCounts, 
  selectedCategories, 
  onCategoryChange, 
  onClearAll 
}) => {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  // console.log(categories);
  // console.log(categoryCounts);
  return (
    <aside className="sidebar py-5">
      <h3  onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)} className="mb-3 text-[1rem] font-[600] cursor-pointer flex items-center font-americana">
        Shop by Category
        <Button
         
          className="transition p-0 !text-[1.3rem] !text-[#FF5252] !rounded-full !w-[2rem] !h-[2rem] !min-w-[2rem] m-auto !ml-[1rem]"
        >
          {isOpenCategoryFilter === true ? (
            <IoMdArrowDropup />
          ) : (
            <IoMdArrowDropdown />
          )}
        </Button>
      </h3>

      <Collapse isOpened={isOpenCategoryFilter}>
        <div className="box">
          <div className="scroll px-3">
          <Checkbox.Group 
        value={selectedCategories} 
        onChange={onCategoryChange}
        className="flex flex-col gap-8"
      >
        {categories.map(category => (
          <Checkbox key={category.idCategory} value={category.idCategory}>
            <span className="text-[1rem] font-[500] text-dark mr-1 ">
            {category.nameCategory}
            </span>
             ({categoryCounts[category.idCategory] || 0})
          </Checkbox>
        ))}
      </Checkbox.Group>
      <Button className="px-10 py-2 bg-[#FF5252] text-white rounded-md !font-serif"
        onClick={onClearAll} 
        style={{ marginTop: '20px' }}
        disabled={selectedCategories.length === 0}
      >
        Clear All
      </Button>
          </div>
        </div>
      </Collapse>
      {/* <div className="box mt-4">
        <h3 className="mb-3 w-full text-[1rem] font-[600] flex items-center font-americana">
          Filter by price
        </h3>
        <RangeSlider
          rangeSlideDisabled={true}
          step={"any"}
          thumbsDisabled={[true, false]}
          defaultValue={[0, 100]}
        />

        <div className="flex pt-4 pb-2 justify-between priceRange">
          <span className="text-[0.813rem]">
            From: <strong className="text-dark">{100} VND </strong>
          </span>
          <span className="text-[0.813rem]">
            To: <strong className="text-dark">{50000} VND </strong>
          </span>
        </div>
      </div> */}
    </aside>
  );
};
export default SideBar;
