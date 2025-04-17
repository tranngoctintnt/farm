import React from "react";

import { MyListItem } from "./MyListItem";
import AccountSideBar from "../../components/AccountSideBar";

const MyList = () => {
  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[30%]">
          <AccountSideBar />
        </div>

        <div className="col2 w-[70%] py-2 px-3">
          <div className="shadow-md rounded-md bg-white">
            <div className="py-5 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h2 className="text-[1.5rem]">Danh sách yêu thích</h2>
              <p className="!py-3">
                Bạn có <span className="font-bold  text-primary">2</span> sản
                phẩm trong danh sách
              </p>
              
            </div>
          </div>

          <MyListItem />
        </div>
      </div>
    </section>
  );
};

export default MyList;
