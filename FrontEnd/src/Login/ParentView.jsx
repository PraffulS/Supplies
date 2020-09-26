import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default class ParentView extends React.Component {
  state = {
    login_view: true,
    sign_up_view: false,
  };

  toggle = () => {
    const { login_view, sign_up_view } = this.state;
    this.setState({
      login_view: !login_view,
      sign_up_view: !sign_up_view,
    });
  };

  componentDidMount() {}
  render() {
    const { login_view, sign_up_view } = this.state;

    return (
      <div style={{ height: "100%" }}>
        <div
          style={{ margin: "5% 30% 10% 30%", padding: "2%", backgroundColor: "white" }}
        >
          {!!login_view && <LoginForm />}
          {!!sign_up_view && <SignUpForm toggle={this.toggle} />}
          <br />
          {login_view ? (
            <>
              Account not created? Click <a onClick={this.toggle}>here</a> to
              Sign Up!
            </>
          ) : (
            <>
              Already have an account? Click <a onClick={this.toggle}>here</a>{" "}
              to Sign In!
            </>
          )}
        </div>
      </div>
    );
  }
}
