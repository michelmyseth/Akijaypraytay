import React from "react";
import { connectToDatabase } from "../../util/mongodb";
import { useState } from "react";
import { GetServerSideProps } from "next";
import { Users } from "../../data/types/users";
import { Props } from "../../data/types/props";
import { checkingConnection } from "../../util/checkingConnection";
import Navbar from "../../components/Navbar";

const Profile: React.FC<Props> = ({ userData, isToken }): JSX.Element => {
  const [displayAdress] = React.useState(userData.profile.adress);
  const [displayPhone] = React.useState(userData.profile.phone);

  return (
    <>
      <Navbar isConnect={isToken} />
      <br />
      <br />
      <br />
      <br />

      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Admin"
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <p className="text-muted font-size-sm">
                        Username: {userData.profile.username}{" "}
                      </p>
                      <p className="text-muted font-size-sm">
                        {displayPhone === 0
                          ? null
                          : `Phone:  ${userData.profile.phone}`}
                      </p>
                      <p className="text-muted font-size-sm">
                        {displayAdress === ""
                          ? null
                          : `Adress: ${userData.profile.adress}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body m-4">
                  <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9 text-secondary">
                      <form method="POST" action="/api/edit">
                        <div className="form">
                          <input
                            type="username"
                            className="form-control"
                            name="userName"
                            placeholder="Enter Username"
                            required
                            minLength={3}
                            maxLength={10}
                          />
                        </div>
                        <br />

                        <div className="form">
                          <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
                            required
                            placeholder="Enter Phone Number"
                          />
                        </div>
                        <br />
                        <div className="form">
                          <input
                            type="adress"
                            className="form-control"
                            name="adress"
                            placeholder="Enter Adress"
                            required
                            minLength={5}
                            maxLength={30}
                          />
                        </div>
                        <br />
                        <button id="Allbutton" type="submit" className="btn">
                          Valider
                        </button>
                        <a
                          className="btn btn-dark"
                          href="/profile"
                          id="cancelButton"
                        >
                          Cancel
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userToken = context.req.cookies.token;
  const checkConnectionValidity = await checkingConnection(userToken);
  // console.log("DB", checkConnectionValidity);
  return checkConnectionValidity;
};
