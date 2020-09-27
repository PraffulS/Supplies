import React from "react";

export class EmptyState extends React.Component {
  render() {
    return (
      <div>
        <div className="not-found">
          <i
            style={{ fontSize: "100px", color: "#f1a7a7" }}
            className="fa fa-exclamation-triangle"
          />{" "}
          <br />
          {this.props.message
            ? this.props.message
            : `No Data Found. Start Adding Products usng Add New Button.`}
        </div>
      </div>
    );
  }
}
