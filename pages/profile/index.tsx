import React from "react";

import { connectToDatabase } from "../../util/mongodb";
import { useState } from "react";

import { GetServerSideProps } from "next";
import { Users } from "../../data/types/users";
import { Props } from "../../data/types/props";
import { checkingConnection } from "../../util/checkingConnection";

const Profile: React.FC<Props> = ({ userData }): JSX.Element => {
  const [display] = React.useState(userData.profile.adress);
  const [contact] = React.useState(userData.profile.contacts);

  return (
    <>
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
                      width="227"
                    />
                    <div className="mt-3">
                      <p className="text-muted font-size-sm">
                        {userData.profile.username}
                      </p>
                      <p className="text-muted font-size-sm">
                        {display === "" ? null : `${userData.profile.adress}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Username</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userData.profile.username}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userData.profile.mail}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userData.profile.phone}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userData.profile.adress}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Contact</h6>
                    </div>

                    {contact.length === 0 ? null : (
                      <div className="col-sm-9 text-secondary">
                        <select name="username">
                          {userData.profile.contacts.map((user, index) => (
                            <option key={index}>{user}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-info " href="/profile/edit">
                        Edit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="card">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Name items</th>
                      <th scope="col">Description</th>
                      <th scope="col">Images</th>
                      <th scope="col">Loaner mail</th>
                      <th scope="col">Borrower mail</th>
                      <th scope="col">Return date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.exchange.map((item) => {
                      return (
                        <>
                          <tr>
                            <th scope="row">{item._id}</th>
                            <td>{item.item.name}</td>
                            <td>{item.item.description}</td>
                            <td>
                              <img
                                id="img-sizing"
                                width="100%"
                                src={item.item.picture}
                                alt=""
                              />
                            </td>
                            <td>{item.loaner}</td>
                            <td>{item.borrower}</td>
                            <td>{item.return_date}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
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
