import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { product_register } from "../services";

export default class AddEditProductsModal extends React.Component {
  static defaultProps = {
    data: {},
  };

  state = {
    data: {},
    loading: false,
  };

  componentDidMount = async () => {
    const { data } = this.props;
    this.setState({ data: { ...data } });
  };

  updateField = (key, val) => {
    const { data } = this.state;
    this.setState({ data: { ...data, ...{ [key]: val } } });
  };

  checkFields = () => {
    const { data } = this.state;
    const {
      name,
      description,
      price_per_unit,
      currency,
      discount_percentage,
      min_units_for_discount,
      code,
    } = data;

    if (
      !name ||
      !description ||
      !price_per_unit ||
      !currency ||
      !discount_percentage ||
      !min_units_for_discount ||
      !code
    ) {
      toast("Please fill all the mandatory fields.", { type: "error" });
      return false;
    }

    return true;
  };

  updateForm = async () => {
    const { data } = this.state;
    if (!this.checkFields()) return;

    this.setState({ loading: true });
    try {
      data.supplier_id = sessionStorage.getItem("supplier_id");
      data.supplier = undefined;
      let response = await product_register(data);
      if (response.code === 1) {
        toast(response.message, { type: "success" });
        this.props.refresh();
        this.props.onHide();
      } else {
        toast(response.message, { type: "error" });
      }
      this.setState({ loading: false });
    } catch (err) {
      toast(err, { type: "error" });
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading } = this.state;
    const {
      id,
      name,
      description,
      price_per_unit,
      currency,
      discount_percentage,
      min_units_for_discount,
      other_notes,
      code,
    } = this.state.data;

    return (
      <Modal
        {...this.props}
        show={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="modal-wide"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {id !== undefined ? `Edit` : `Create`} a Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="display-flex">
              <div style={{ flex: 1 }}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    onChange={(e) => this.updateField("name", e.target.value)}
                    type="text"
                    value={name}
                    maxLength={50}
                  />
                </Form.Group>
              </div>
              <div style={{ flex: 0.1 }}></div>
              <div style={{ flex: 1 }}>
                <Form.Group>
                  <Form.Label>Product Code</Form.Label>
                  <Form.Control
                    onChange={(e) => this.updateField("code", e.target.value)}
                    type="text"
                    value={code}
                    maxLength={50}
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={(e) =>
                  this.updateField("description", e.target.value)
                }
                value={description}
                as="textarea"
                rows="3"
                maxLength={500}
              />
            </Form.Group>

            <div className="display-flex">
              <div style={{ flex: 1 }}>
                <Form.Group>
                  <Form.Label>Price per unit</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.updateField("price_per_unit", e.target.value)
                    }
                    type="number"
                    value={price_per_unit}
                    maxLength={50}
                  />
                </Form.Group>
              </div>
              <div style={{ flex: 0.1 }}></div>
              <div style={{ flex: 1 }}>
                <Form.Group>
                  <Form.Label>Currency</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.updateField("currency", e.target.value)
                    }
                    type="text"
                    value={currency}
                    maxLength={50}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="display-flex">
              <div style={{ flex: 1 }}>
                <Form.Group>
                  <Form.Label>Discount (in %)</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.updateField("discount_percentage", e.target.value)
                    }
                    type="number"
                    value={discount_percentage}
                    maxLength={50}
                  />
                </Form.Group>
              </div>
              <div style={{ flex: 0.1 }}></div>
              <div style={{ flex: 1 }}>
                <Form.Group>
                  <Form.Label>Minimum units for discount</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.updateField("min_units_for_discount", e.target.value)
                    }
                    type="text"
                    value={min_units_for_discount}
                    maxLength={50}
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group>
              <Form.Label>Other note (optional)</Form.Label>
              <Form.Control
                onChange={(e) =>
                  this.updateField("other_notes", e.target.value)
                }
                value={other_notes}
                as="textarea"
                rows="3"
                maxLength={500}
              />
            </Form.Group>
          </Form>

          <div style={{ textAlign: "right" }}>
            <Button
              disabled={loading}
              className="btn btn-primary"
              onClick={this.updateForm}
            >
              {id !== undefined ? `Update` : `Add`}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
