import React from "react";
import SupplierProfile from "./Profile Page/SupplierProfile";

export const routes = [
  {
    path: "/profile",
    exact: true,
    main: () => <SupplierProfile />
  }
];