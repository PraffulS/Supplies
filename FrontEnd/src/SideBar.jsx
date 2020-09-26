import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "./utils";

class SideBarImpl extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div style={{ height: "100%", backgroundColor: "#efefef" }}>
        <div className="title" onClick={() => (window.location.hash = "")}>
          <i className="fa fa-th-list" aria-hidden="true"></i> &nbsp; Suppliers
          Page
        </div>
        <div
          style={{
            padding: "3%",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <NavLink activeClassName="active-link" to="/profile">
                <i style={{ fontSize: "100%" }} className="/profile" />
                &nbsp; &nbsp; Profile{" "}
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active-link" to="/products">
                <i style={{ fontSize: "100%" }} className="/products" />
                &nbsp; &nbsp; Products{" "}
              </NavLink>
            </li>

            <li>
              <NavLink
                activeClassName="active-link"
                to="/logout"
                onClick={logout}
              >
                <i
                  style={{ fontSize: "100%" }}
                  className="fa fa-shopping-bag"
                />
                &nbsp; &nbsp; Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export const SideBar = SideBarImpl;
