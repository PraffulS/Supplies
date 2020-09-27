import React from "react";
import SuppliersListView from "./Admin/Suppliers/SuppliersListView";
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
  },
  {
    path: "/orders",
    exact: true,
    main: () => <>Under Construction</>
  },
  {
    path: "/quotes",
    exact: true,
    main: () =>  <>Under Construction</>
  }
];

export const admin_routes = [
  {
    path: "/admin/suppliers",
    exact: true,
    main: () => <SuppliersListView />
  },
  {
    path: "/admin/products",
    exact: true,
    main: () => <ProductsListView />
  },
  {
    path: "/orders",
    exact: true,
    main: () => <>Under Construction</>
  },
  {
    path: "/quotes",
    exact: true,
    main: () =>  <>Under Construction</>
  }
];

export const products_list_headers = [
  { label: "Sr. No.", flex: "1" },
  { label: "Title", flex: "2" },
  { label: "Code", flex: "1" },
  { label: "Price/unit", flex: "1" },
  { label: "Last Updated", flex: "1.5" }
];

export const suppliers_list_headers = [
  { label: "Sr. No.", flex: "1" },
  { label: "Supplier Name", flex: "2" },
  { label: "Email", flex: "1" },
  { label: "Contact", flex: "1" },
  { label: "Last Active", flex: "1.5" }
];