import React from "react";
import { Button } from "react-bootstrap";
import moment from "moment";
import AddEditProductsModal from "./AddEditProductsModal";
import { toast } from "react-toastify";
import { delete_product } from "../services";

export default class DataCard extends React.Component {
  static defaultProps = {
    data: {},
  };

  state = {
    showModal: false,
    loading: false,
  };

  delete = async () => {
    const { data } = this.props;
    const { id } = data;
    this.setState({ loading: true });
    let res = await delete_product(id);
    toast("Deleted Successfully!", { type: "success" });
    this.props.refresh();
  };

  render() {
    const { showModal, loading } = this.state;
    const { data, index } = this.props;
    const {
      id,
      name,
      description,
      price_per_unit,
      currency,
      discount_percentage,
      min_units_for_discount,
      other_notes,
      created_at,
      last_updated_at,
      is_deleted,
      code,
    } = data;

    return (
      <div className="data-card">
        {!!showModal && (
          <AddEditProductsModal
            refresh={this.props.refresh}
            onHide={() => this.setState({ showModal: false })}
            data={data}
          />
        )}
        <div>
          <div className="display-flex">
            <div style={{ flex: 1 }}>{index + 1}</div>
            <div style={{ flex: 2 }}>
              <h5>{name}</h5>
            </div>
            <div style={{ flex: 1 }}>#{code}</div>
            <div style={{ flex: 1 }}>
              {currency} {price_per_unit}
            </div>
            <div style={{ flex: 1.5 }}>
              {moment(last_updated_at).format("Do MMM YY, hh:mm a")}{" "}
            </div>
          </div>
        </div>
        <div className="display-flex">
          <div style={{ flex: 0.8 }}>
            <i>{description}</i>
          </div>
          <div style={{ flex: 0.2, textAlign: "right" }}>
            <Button
              className="btn-outline-primary sleek-button"
              onClick={this.delete}
              disabled={loading}
            >
              Delete <i className="fa fa-trash" aria-hidden="true"></i>
            </Button>{" "}
            &nbsp;&nbsp;{" "}
            <Button
              className="btn-outline-primary sleek-button"
              onClick={() => this.setState({ showModal: true })}
              disabled={loading}
            >
              Edit <i className="fa fa-edit" aria-hidden="true"></i>{" "}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
