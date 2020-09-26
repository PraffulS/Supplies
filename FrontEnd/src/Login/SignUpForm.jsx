import React from "react";
import { Button, Form } from "react-bootstrap";
import { supplier_register } from "../services";
import { toast } from "react-toastify";

export default class SignUpForm extends React.Component {
  state = {
    business_name: "",
    business_address: "",
    primary_repr_name: "",
    primary_email: "",
    password: "",
    loading: false,
  };

  updateField = (key, val) => {
    this.setState({ [key]: val });
  };

  checkFields = () => {
    const {
      business_name,
      business_address,
      primary_repr_name,
      primary_email,
      password,
    } = this.state;
    if (
      !business_name.length ||
      !business_address.length ||
      !primary_repr_name.length ||
      !primary_email.length ||
      !password.length
    ) {
      toast("Please fill all the fields.", { type: "error" });
      return false;
    }

    if (password.length < 8) {
      toast("Password should contacn atleast 8 characters", { type: "error" });
      return false;
    }

    return true;
  };


  signup = async () => {
    if(!this.checkFields()) return;
    this.setState({ loading: true });

    try {
      let response = await supplier_register(this.state);
      if (response.code === 1) {
        toast(response.message, { type: "success" });
        this.props.toggle();
      } else {
        toast(response.message, { type: "error" });
      }
      this.setState({ loading: false });
    } catch (err) {
      toast(err, { type: "error" });
      this.setState({ loading: false });
    }
  };

  componentDidMount() {}
  render() {
    const {
      business_name,
      business_address,
      primary_repr_name,
      primary_email,
      password,
      loading,
    } = this.state;

    return (
      <div>
        <h3 style={{ textAlign: "center" }}> Tell us about yourself</h3>
        <Form>
          <Form.Group>
            <Form.Label>Your Business Name</Form.Label>
            <Form.Control
              onChange={(e) =>
                this.updateField("business_name", e.target.value)
              }
              type="text"
              value={business_name}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Your Address</Form.Label>
            <Form.Control
              onChange={(e) =>
                this.updateField("business_address", e.target.value)
              }
              as="textarea"
              rows="3"
              value={business_address}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              onChange={(e) =>
                this.updateField("primary_repr_name", e.target.value)
              }
              type="text"
              value={primary_repr_name}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Your Email Id</Form.Label>
            <Form.Control
              onChange={(e) =>
                this.updateField("primary_email", e.target.value)
              }
              type="text"
              value={primary_email}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password </Form.Label>
            <Form.Control
              onChange={(e) => this.updateField("password", e.target.value)}
              type="text"
              value={password}
              maxLength={50}
            />
          </Form.Group>
        </Form>

        <Button onClick={this.signup} className="primary" disabled={loading}>
          Sign Up
        </Button>
      </div>
    );
  }
}
