import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { get_supplier, supplier_register } from "../services";
import SupplierProfileForm from "./SupplierProfileForm";

export default class SupplierProfile extends React.Component {
  state = {
    loading: true,
    data: {},
    showEdit: false,
    saving: false
  };

  componentDidMount = async () => {
    const supplier_id = sessionStorage.getItem("supplier_id");
    let res = await get_supplier(supplier_id);
    this.setState({
      data: res.data,
      loading: false,
    });
  };

  

  renderValue = (label, value) => {
    return (
      <div>
        <span style={{ fontSize: "22px", color: "grey" }}>
          {value ? (
            value
          ) : (
            <span style={{ color: "rgb(235, 114, 114)" }}>Not Filled</span>
          )}
        </span>{" "}
        <br />
        <span>{label}</span>
      </div>
    );
  };

  renderProfile = () => {
    const { data, showEdit } = this.state;
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

    if (showEdit)
      return (
        <SupplierProfileForm
          data={data}
          changeState={ (data) => this.setState({...data})}
          onCancel={() => this.setState({ showEdit: false })}
        />
      );

    return (
      <>
        <Button
          style={{ float: "right" }}
          onClick={() => this.setState({ showEdit: true })}
        >
          Edit Profile
        </Button>
        <h5 style={{ color: "#7e7edf" }}>My Profile</h5>
        <div>{this.renderValue("Business Name", business_name)}</div> <br />
        <div>{this.renderValue("Address", business_address)}</div>
        <hr />
        <h5 style={{ color: "#7e7edf" }}>Primary Contact Details</h5>
        <div>{this.renderValue("Name", primary_repr_name)}</div> <br />
        <div className="display-flex">
          <div style={{ flex: 0.5 }}>
            {this.renderValue("Email", primary_email)}
          </div>
          <div style={{ flex: 0.5 }}>
            {this.renderValue("Contact", primary_contact)}
          </div>
        </div>
        <hr />
        <h5 style={{ color: "#7e7edf" }}>Secondary Contact Details</h5>
        <div>{this.renderValue("Name", secondary_repr_name)}</div> <br />
        <div className="display-flex">
          <div style={{ flex: 0.5 }}>
            {this.renderValue("Email", secondary_email)}
          </div>
          <div style={{ flex: 0.5 }}>
            {this.renderValue("Contact", secondary_contact)}
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
          this.renderProfile()
        )}
      </div>
    );
  }
}
