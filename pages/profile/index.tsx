import React from "react";

import { connectToDatabase } from "../../util/mongodb";
import { useState } from "react";

import { GetServerSideProps } from "next";
import { Users } from "../../data/types/users";
import { Props } from "../../data/types/props";
import { checkingConnection } from "../../util/checkingConnection";

const Profile: React.FC<Props> = ({ userData }): JSX.Element => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="main-body">
          <div className="row">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar6.png"
                    alt="Admin"
                    className="rounded-circle p-1 bg-primary"
                    width="400"
                  />
                  <div className="mt-3">
                    <p className="text-secondary mb-1">
                      Username : {userData.profile.username}
                    </p>

                    <p className="text-secondary mb-1">
                      Email : {userData.profile.mail}
                    </p>

                    <p className="text-muted font-size-sm"></p>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="btn btn-primary w-30 text-white">
                  <a className="text-light" href="/profile/edit">
                    EDIT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userToken = context.req.cookies.token;

  const checkConnectionValidity = await checkingConnection(userToken);
  console.log("DB", checkConnectionValidity);

  return checkConnectionValidity;
};
