import React from "react";
import { Button, Form } from "react-bootstrap";
import { admin_login } from "../services";
import { toast } from "react-toastify";

export default class AdminLogin extends React.Component {
  state = {
    username: "",
    password: "",
    loading: false,
  };

  updateField = (key, val) => {
    this.setState({ [key]: val });
  };

  login = async () => {
    this.setState({ loading: true });
    const { username, password } = this.state;
    try {
      let response = await admin_login(username, password);

      if (response.code === 1) {
        toast(response.message, { type: "error" });
      } else {
        sessionStorage.setItem('admin_id', response.admin_id);
        toast(response.message, { type: "success" });
        window.location.href = '';
      }

      this.setState({ loading: false });
    } catch (err) {
      toast(err, { type: "error" });
      this.setState({ loading: false });
    }
  };

  componentDidMount() {}
  render() {
    const { username, password, loading } = this.state;

    return (
      <div>
        <h3 style={{ textAlign: "center" }}> Admin Sign In</h3>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={(e) => this.updateField("username", e.target.value)}
              type="text"
              value={username}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password </Form.Label>
            <Form.Control
              onChange={(e) => this.updateField("password", e.target.value)}
              type="password"
              value={password}
              maxLength={50}
            />
          </Form.Group>
        </Form>

        <Button
          onClick={this.login}
          className="primary"
          disabled={loading ? loading : !username.length || !password.length}
        >
          Sign In
        </Button>
      </div>
    );
  }
}
