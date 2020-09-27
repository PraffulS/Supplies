import React from "react";
import { Button } from "react-bootstrap";
import moment from "moment";
import SupplierInfoModal from "./SupplierInfoModal";

export default class DataCard extends React.Component {
  static defaultProps = {
    data: {},
  };

  state = {
    showModal: false,
  };

  render() {
    const { showModal } = this.state;
    const { data, index } = this.props;
    const {
      id,
      business_name,
      business_address,
      primary_repr_name,
      primary_email,
      primary_contact,
      secondary_repr_name,
      secondary_email,
      secondary_contact,
      last_updated_at,
    } = data;

    return (
      <div className="data-card">
        {!!showModal && (
          <SupplierInfoModal
            onHide={() => this.setState({ showModal: false })}
            data={data}
          />
        )}
        <div>
          <div className="display-flex">
            <div style={{ flex: 1 }}>{index + 1}</div>
            <div style={{ flex: 2 }}>
              <h6>{business_name}</h6>
            </div>
            <div style={{ flex: 1 }}>{primary_email ? primary_email : "-"}</div>
            <div style={{ flex: 1 }}>
              {primary_contact ? primary_contact : "-"}
            </div>
            <div style={{ flex: 1.5 }}>
              {moment(last_updated_at).format("Do MMM YY, hh:mm a")}{" "}
            </div>
          </div>
        </div>
        <div className="display-flex">
          <div style={{ flex: 0.7 }}>
            Primary Representative Name -{" "}
            <b>
              <i>{primary_repr_name}</i>
            </b>
          </div>
          <div style={{ flex: 0.3, textAlign: "right" }}>
            <Button className="btn-outline-primary sleek-button">
              Request Quote <i className="far fa-envelope"></i>
            </Button>{" "}
            &nbsp;&nbsp;{" "}
            <Button
              className="btn-outline-primary sleek-button"
              onClick={() => this.setState({ showModal: true })}
            >
              View{" "}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
