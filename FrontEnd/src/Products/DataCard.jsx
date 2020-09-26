import React from "react";
import { Button } from "react-bootstrap";
import moment from "moment";

export default class DataCard extends React.Component {
  static defaultProps = {
    data: {},
  };

  render() {
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
        {/* {!!showModal && (
          <AddEditTodoModal
            onHide={() => this.setState({ showModal: false })}
          />
        )} */}
        <div>
          <div className="display-flex">
            <div style={{ flex: 1 }}>{index+1}</div>
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
          <div style={{ flex: 0.2, textAlign: 'right' }}>
            <Button className="btn-outline-primary sleek-button">Delete <i className="fa fa-trash" aria-hidden="true"></i></Button>{" "}
            &nbsp;&nbsp;{" "}
            <Button className="btn-outline-primary sleek-button">Edit <i className="fa fa-edit" aria-hidden="true"></i> </Button>
          </div>
        </div>
      </div>
    );
  }
}
