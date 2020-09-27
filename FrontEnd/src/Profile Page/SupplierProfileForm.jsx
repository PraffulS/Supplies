import React from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { get_supplier, supplier_register } from "../services";

export default class SupplierProfileForm extends React.Component {
  static defaultProps = {
    data: {},
  };

  state = {
    data: {},
    saving: false
  };

  componentDidMount = async () => {
    const { data } = this.props;
    this.setState({ data: { ...data } });
  };

  updateField = (key, val) => {
    const { data } = this.state;
    this.setState({ data: { ...data, ...{ [key]: val } } });
  };

  checkFields = (data) => {
    const {
      business_name,
      business_address,
      primary_repr_name,
      primary_email,
    } = data;
    if (
      !business_name.length ||
      !business_address.length ||
      !primary_repr_name.length ||
      !primary_email.length
    ) {
      toast("Please fill all the mandatory fields.", { type: "error" });
      return false;
    }
    return true;
  };

  saveProfile = async (data) => {
    if (!this.checkFields(data)) return;
    this.setState({ saving: true });
    try {
      data.id = sessionStorage.getItem("supplier_id");
      let response = await supplier_register(data);
      if (response.code === 1) {
        toast("We've successfuly saved your information!", { type: "success" });
        this.props.changeState({ saving: false, showEdit: false, data: response.data });
      } else {
        toast(response.message, { type: "error" });
        this.setState({ saving: false });
      }
    } catch (err) {
      toast(err, { type: "error" });
      this.setState({ saving: false });
    }
  };

  renderProfileForm = () => {
    const { data, showEdit, saving } = this.state;
    const {
      business_name,
      business_address,
      primary_repr_name,
      primary_email,
      primary_contact,
      secondary_repr_name,
      secondary_email,
      secondary_contact,
    } = data;

    if (showEdit) return <>edit page</>;

    return (
      <>
        <div style={{ float: "right" }}>
          <Button disabled={saving} onClick={this.props.onCancel} className="btn-outline-primary">
            Cancel
          </Button>{" "}
          &nbsp;&nbsp;
          <Button disabled={saving} onClick={() => this.saveProfile(data)}>Save</Button>
        </div>
        <h5 style={{ color: "#7e7edf" }}>My Profile</h5>
        <Form>
          <Form.Group>
            <Form.Label>Business Name</Form.Label>
            <Form.Control
              onChange={(e) =>
                this.updateField("business_name", e.target.value)
              }
              type="text"
              value={business_name}
              maxLength={50}
            />
          </Form.Group>
        </Form>
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
        <hr />
        <h5 style={{ color: "#7e7edf" }}>Primary Contact Details</h5>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) =>
              this.updateField("primary_repr_name", e.target.value)
            }
            type="text"
            value={primary_repr_name}
            maxLength={50}
          />
        </Form.Group>
        <div className="display-flex">
          <div style={{ flex: 0.4 }}>
            <Form.Group>
              <Form.Label>Email Id</Form.Label>
              <Form.Control
                onChange={(e) =>
                  this.updateField("primary_email", e.target.value)
                }
                type="text"
                value={primary_email}
                maxLength={50}
              />
            </Form.Group>
          </div>
          <div style={{ flex: 0.1 }}></div>
          <div style={{ flex: 0.4 }}>
            <Form.Group>
              <Form.Label>Contact</Form.Label>
              <Form.Control
                onChange={(e) =>
                  this.updateField("primary_contact", e.target.value)
                }
                type="number"
                value={primary_contact}
                maxLength={10}
              />
            </Form.Group>
          </div>
        </div>
        <hr />
        <h5 style={{ color: "#7e7edf" }}>Secondary Contact Details</h5>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) =>
              this.updateField("secondary_repr_name", e.target.value)
            }
            type="text"
            value={secondary_repr_name}
            maxLength={50}
          />
        </Form.Group>
        <div className="display-flex">
          <div style={{ flex: 0.4 }}>
            <Form.Group>
              <Form.Label>Email Id</Form.Label>
              <Form.Control
                onChange={(e) =>
                  this.updateField("secondary_email", e.target.value)
                }
                type="text"
                value={secondary_email}
                maxLength={50}
              />
            </Form.Group>
          </div>
          <div style={{ flex: 0.1 }}></div>
          <div style={{ flex: 0.4 }}>
            <Form.Group>
              <Form.Label>Contact</Form.Label>
              <Form.Control
                onChange={(e) =>
                  this.updateField("secondary_contact", e.target.value)
                }
                type="number"
                value={secondary_contact}
                maxLength={10}
              />
            </Form.Group>
          </div>
        </div>
      </>
    );
  };

  render() {
    const { loading } = this.state;

    return (
      <div>
        {loading ? (
          <>Please wait while get the data...</>
        ) : (
          this.renderProfileForm()
        )}
      </div>
    );
  }
}
