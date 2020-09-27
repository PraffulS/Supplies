import React from "react";
import AdminLogin from "../Admin/AdminLogin";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default class ParentView extends React.Component {
  state = {
    login_view: true,
    sign_up_view: false,
    admin_login_view: false,
  };

  toggle = (a, b, c) => {
    this.setState({
      login_view: a,
      sign_up_view: b,
      admin_login_view: c,
    });
  };

  componentDidMount() {}
  render() {
    const { login_view, sign_up_view, admin_login_view } = this.state;

    return (
      <div style={{ height: "100%" }}>
        <div
          style={{
            margin: "5% 30% 10% 30%",
            padding: "2%",
            backgroundColor: "white",
          }}
        >
          {!!login_view && <LoginForm />}
          {!!sign_up_view && <SignUpForm toggle={this.toggle} />}
          {!!admin_login_view && <AdminLogin />}
          <br />
          {!!login_view && (
            <>
              Account not created? Click{" "}
              <a onClick={() => this.toggle(0, 1, 0)}>here</a> to Sign Up!{" "}
              <br />
              <br />
              Click <a onClick={() => this.toggle(0, 0, 1)}>here</a> for Admin
              Login
            </>
          )}
          {!!sign_up_view && (
            <>
              Already have an account? Click{" "}
              <a onClick={() => this.toggle(1, 0, 0)}>here</a> to Sign In!
            </>
          )}
          {!!admin_login_view && (
            <>
              Not an Admin? Click{" "}
              <a onClick={() => this.toggle(1, 0, 0)}>here</a> to go back!{" "}
            </>
          )}
        </div>
      </div>
    );
  }
}
