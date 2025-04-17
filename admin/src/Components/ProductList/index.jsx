// import React, { useState } from "react";
// import Checkbox from "@mui/material/Checkbox";
// import { Link, NavLink } from "react-router-dom";
// import { MdOutlineModeEdit } from "react-icons/md";
// import { IoTrashOutline } from "react-icons/io5";
// import Tooltip from "@mui/material/Tooltip";
// import TablePagination from "@mui/material/TablePagination";
// import { Button } from "@mui/material";
// import { IoSearchSharp } from "react-icons/io5";

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

// const ProductList = () => {
//   const [page, setPage] = useState(2);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//   return (
//     <div className="card border my-4 hadow-md sm:rounded-lg bg-white">
//       <div className="flex items-center justify-between px-5 py-5">
//         <h2 className="text-[22px]">Products</h2>
//         <NavLink  className={({ isActive }) =>
//             isActive ? 'activeClassName' : undefined
//         } end to="/product/upload">
//         <Button className="!bg-[#D86500] !text-white !capitalize !py-2 !px-4">
//           Add Product
//         </Button>
//         </NavLink>
        
//       </div>

//        <div className="searchBox w-[600px] px-8  flex items-center relative p-2">
//             <input
//               type="text"
//               placeholder="Search for product..."
//               className="w-full text-[18px] px-6 rounded-[6px]  !bg-[#f1f1f1] h-12 focus:outline-none bg-inherit "
//             />
//             <Button className="!absolute top-[16px] right-[44px] z-10 !w-[37px] !min-w-[37px] !h-[35px] !rounded-full text-black">
//               <IoSearchSharp className="text-[22px] text-[#5e5c5c]" />
//             </Button>
//           </div>
//       <div className="relative overflow-x-auto mt-5 pb-5">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-2 py-3" width="5%">
//                 <div className="w-[60px]">
//                   <Checkbox {...label} size="small" />
//                 </div>
//               </th>
//               <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                 Product
//               </th>
//               <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                 Category
//               </th>
//               <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                 Price
//               </th>
//               <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                 Sales
//               </th>
//               <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                 Stock
//               </th>
//               <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
//               <td className="px-2 py-2">
//                 <div className="w-[60px]">
//                   <Checkbox {...label} size="small" />
//                 </div>
//               </td>

//               <td className="px-6 py-2">
//                 <div className="flex items-center gap-4">
//                   <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
//                     <Link to="/product/1234">
//                       <img
//                         src="/feed1.png"
//                         className="w-full h-full group-hover:scale-105 transition-all"
//                         alt=""
//                       />
//                     </Link>
//                   </div>

//                   <div className="info w-[75%]">
//                     <h3 className="font-[500] text-[16px] hover:text-primary">
//                       <Link to="/product/1234">Sung My</Link>
//                     </h3>
//                   </div>
//                 </div>
//               </td>

//               <td className="px-6 py-2">Trai Cay</td>

//               <td className="px-6 py-2">
//                 <div className="flex gap-1 flex-col">
//                   <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
//                     499.00 <span>VND</span>
//                   </span>
//                   <span className="price text-primary text-[14px]  font-[600]">
//                     599.00 <span>VND</span>
//                   </span>
//                 </div>
//               </td>

//               <td className="px-6 py-2">
//                 <p className="text-[14px] w-[70px]">
//                   <span className="font-[600]">0</span> sale
//                 </p>
//               </td>

//               <td className="px-6 py-2">
//                 <p className="text-[14px] w-[70px]">
//                   <span className="font-[600] text-primary">48544</span>
//                 </p>
//               </td>

//               <td className="px-6 py-2">
//                 <div className="flex items-center gap-3 ">
//                   <Tooltip title="Edit">
//                     <Link to="/product/product-edit/123">
//                       <Button className="!text-[rgba(0,0,0,0.8)] group !w-[35px] hover:!border-primary !h-[35px] !min-w-[35px] !border !border-solid !border-[rgba(0,0,0,0.6)] !rounded-md">
//                         <MdOutlineModeEdit className="text-[18px] group-hover:!text-primary" />
//                       </Button>
//                     </Link>
//                   </Tooltip>

//                   <Tooltip title="Delete">
//                     <Button className="!text-[rgba(0,0,0,0.8)] !w-[35px] group hover:!border-primary !h-[35px] !min-w-[35px] !border !border-solid !border-[rgba(0,0,0,0.6)] !rounded-md">
//                       <IoTrashOutline className="text-[18px] group-hover:!text-primary" />
//                     </Button>
//                   </Tooltip>
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <TablePagination
//         component="div"
//         count={100}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </div>
//   );
// };

// export default ProductList;
