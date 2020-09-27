import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "./utils";

class SideBarImpl extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div style={{ height: "100%", backgroundColor: "#efefef" }}>
        <div className="title" onClick={() => (window.location.hash = "")}>
          <i class="fas fa-book-open"></i> &nbsp; Suppliers Page
        </div>
        <div
          style={{
            padding: "3%",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <NavLink activeClassName="active-link" to="/profile">
                <i class="fa fa-address-card" aria-hidden="true"></i>
                &nbsp; &nbsp; Profile{" "}
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active-link" to="/products">
              <i class="fas fa-stream"></i>
                &nbsp; &nbsp; Products{" "}
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active-link" to="/orders">
              <i class="fas fa-wallet"></i>
                &nbsp; &nbsp; Orders{" "}
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active-link" to="/quotes">
              <i class="far fa-envelope"></i>
                &nbsp; &nbsp; Sent Quotes{" "}
              </NavLink>
            </li>

            <li>
              <NavLink
                activeClassName="active-link"
                to="/logout"
                onClick={logout}
              >
                <i class="fas fa-sign-out-alt"></i>
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
