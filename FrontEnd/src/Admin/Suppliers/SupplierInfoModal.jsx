import React from "react";
import { Modal} from "react-bootstrap";
import SupplierProfile from "../../Profile Page/SupplierProfile";

export default class SupplierInfoModal extends React.Component {
  static defaultProps = {
    data: {},
  };

  render() {
    const { data } = this.props;
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
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SupplierProfile data={data} />
        </Modal.Body>
      </Modal>
    );
  }
}
