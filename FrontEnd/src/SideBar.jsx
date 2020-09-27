import React from "react";
import { NavLink } from "react-router-dom";
import { isLoggedIn, logout } from "./utils";

class SideBarImpl extends React.Component {
  componentDidMount() {}
  render() {
    const check_login_type = isLoggedIn();

    return (
      <div style={{ height: "100%", backgroundColor: "#efefef" }}>
        <div className="title" onClick={() => (window.location.hash = "")}>
          <i className="fas fa-book-open"></i> &nbsp;{" "}
          {check_login_type === 1 ? `Suppliers Page` : `Admin Page`}
        </div>
        <div
          style={{
            padding: "3%",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <NavLink
                activeClassName="active-link"
                to={check_login_type === 1 ? "/profile" : "/admin/suppliers"}
              >
                <i className="fa fa-address-card" aria-hidden="true"></i>
                &nbsp; &nbsp; {check_login_type === 1
                  ? "Profile"
                  : "Suppliers"}{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active-link"
                to={check_login_type === 1 ? "/products" : "/admin/products"}
              >
                <i className="fas fa-stream"></i>
                &nbsp; &nbsp; Products{" "}
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active-link" to="/orders">
                <i className="fas fa-wallet"></i>
                &nbsp; &nbsp; Orders{" "}
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active-link" to="/quotes">
                <i className="far fa-envelope"></i>
                &nbsp; &nbsp;{" "}
                {check_login_type === 1
                  ? "Sent Quotes"
                  : "Requested Quotes"}{" "}
              </NavLink>
            </li>

            <li>
              <NavLink
                activeClassName="active-link"
                to="/logout"
                onClick={logout}
              >
                <i className="fas fa-sign-out-alt"></i>
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
