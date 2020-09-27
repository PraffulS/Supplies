import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "moment";
import AddEditProductsModal from "./AddEditProductsModal";
import { toast } from "react-toastify";
import { delete_product } from "../services";

export default class DataCard extends React.Component {
  static defaultProps = {
    data: {},
    viewOnly: false,
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

  renderTooltip = (discount_percentage, min_units_for_discount) => {
    return (
      <>
        Discount of ${discount_percentage} % on minimum order of $
        {min_units_for_discount}
      </>
    );
  };

  render() {
    const { showModal, loading } = this.state;
    const { data, index, viewOnly } = this.props;
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
      supplier,
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
              {currency} {price_per_unit}{" "}
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip">
                    Discount of {discount_percentage} % on minimum order of{" "}
                    {min_units_for_discount} units
                  </Tooltip>
                }
              >
                <span style={{ color: "#4a90e2" }}>
                  {" "}
                  &nbsp; &nbsp; <i className="fa fa-info-circle"></i>
                </span>
              </OverlayTrigger>
            </div>
            <div style={{ flex: 1.5 }}>
              {moment(last_updated_at).format("Do MMM YY, hh:mm a")}{" "}
            </div>
          </div>
        </div>
        <div className="display-flex">
          <div style={{ flex: 0.8 }}>
            <i>{description}</i>
            {!!viewOnly && (
              <>
                <br />
                Supplier Name - <b>{supplier.business_name}</b>
              </>
            )}
          </div>
          <div style={{ flex: 0.2, textAlign: "right" }}>
            {!viewOnly ? (
              <>
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
              </>
            ) : (
              <Button className="btn-outline-primary sleek-button">
                Request Quote <i className="far fa-envelope"></i>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
