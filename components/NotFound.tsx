import "bootstrap/dist/css/bootstrap.css";
import React from "react";

const NotFound: React.FC<{ isConnect: boolean }> = ({ isConnect }) => {
  return (
    <div className="container-xl">
      <div className="row d-flex align-items">
        <div className="col-6">
          <br />
          <img src="/img/3.png" width="450" height="450" />
        </div>
        <div className="col-6">
          <br />
          <br />
          <h1 className="text-center">Oops !</h1>
          <h2 className="text-center">
            Are you sure you intend to come here ?
          </h2>
          <br />
          <br />
          <div className="d-flex justify-content-center">
            <a id="Allbutton" className="btn btn-lg" href="/" role="button">
              {isConnect ? "Go back to your Dashboard" : "Go back Home"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
