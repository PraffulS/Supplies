import React from "react";

export class Loading extends React.Component {
  render() {
    return (
      <div>
        <div className="not-found">
          <img  style={{width:'45%'}} src="https://flevix.com/wp-content/uploads/2019/07/Ring-Loading-1.gif"></img>
          <br />
          Please wait.. while we load the data for you.
        </div>
      </div>
    );
  }
}
