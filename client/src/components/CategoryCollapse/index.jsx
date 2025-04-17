import React from "react";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { Link } from "react-router-dom";

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.grey[200],
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(0, 1.2),
    ...theme.applyStyles("light", {
      backgroundColor: alpha(theme.palette.primary.main, 0.25),
    }),
    ...theme.applyStyles("dark", {
      color: theme.palette.primary.contrastText,
    }),
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  ...theme.applyStyles("light", {
    color: theme.palette.grey[800],
  }),
}));

const CategoryCollapse = () => {
  return (
    <Box className="p-4" sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView defaultExpandedItems={["grid"]}>
        <CustomTreeItem itemId="san-pham" label="Sản phẩm">
          <Link to='/productList'><CustomTreeItem itemId="all" label="Tất cả" /></Link>
          <CustomTreeItem itemId="traicay" label="Trái Cây" />
          <CustomTreeItem itemId="nuoc-ep" label="Nước ép" />
        </CustomTreeItem>
        <CustomTreeItem itemId="special" label="Special"> </CustomTreeItem>
        <CustomTreeItem itemId="about" label="About">
          <CustomTreeItem itemId="sft" label="Suối Tiên Farm" />
          <CustomTreeItem itemId="suoitienthemepark" label="Suối Tiên Theme Park" />
        </CustomTreeItem>
        <CustomTreeItem itemId="charts" label="Chương trình">
          <CustomTreeItem itemId="uu-dai" label="Ưu đãi" />
          <CustomTreeItem itemId="sukien" label="Sự kiện" />
        </CustomTreeItem>
        <CustomTreeItem itemId="hoptac" label="Chính sách hợp tác">
          <CustomTreeItem itemId="chinh-sach" label="Chính sách">
          <CustomTreeItem itemId="doitac" label="Đối tác" />

          </CustomTreeItem>
        </CustomTreeItem>

        <CustomTreeItem itemId="contact" label="Contact">
          <CustomTreeItem itemId="time-activity" label="Giờ mở cửa">
          <CustomTreeItem itemId="faq" label="Câu hỏi thường gặp" />

          </CustomTreeItem>
        </CustomTreeItem>
      </SimpleTreeView>
    </Box>
  );
};

export default CategoryCollapse;
