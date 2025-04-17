import React from "react";

const EmptyCheckout = () => {
  return (
    <>
    {/* <div className=""></div> */}
      <div className="@5xl:col-span-8 @6xl:col-span-7">
        <div
          data-testid="empty-state"
          className="rizzui-empty-root flex flex-col items-center"
        >
          <div className="text-center p-20">
            <div className="rizzui-empty-icon">
              <img src="empty-cart.png" alt="" />
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyCheckout;
