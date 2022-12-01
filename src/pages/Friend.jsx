import React from "react";
import "../App.css";

const Friend = ({availability, setavailability}) => {
  return (
    <>
      <button onClick={()=>setavailability('No')} className="btn btn-primary">
        Get Status
      </button>
      <hr />
      <div className="App">Friend Status {availability}</div>
    </>
  );
};

export default Friend;
