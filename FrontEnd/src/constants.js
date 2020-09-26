import React from "react";
import ProductsListView from "./Products/ProductsListView";
import SupplierProfile from "./Profile Page/SupplierProfile";

export const routes = [
  {
    path: "/profile",
    exact: true,
    main: () => <SupplierProfile />
  },
  {
    path: "/products",
    exact: true,
    main: () => <ProductsListView />
  }
];

export const products_list_headers = [
  { label: "Sr. No.", flex: "1" },
  { label: "Title", flex: "2" },
  { label: "Code", flex: "1" },
  { label: "Price/unit", flex: "1" },
  { label: "Last Updated", flex: "1.5" }
];