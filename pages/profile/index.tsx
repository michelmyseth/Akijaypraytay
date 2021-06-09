import React from "react";
import { GetServerSideProps } from "next";
import { Props } from "../../data/types/props";
import { checkingConnection } from "../../util/checkingConnection";
import { findingEmoji } from "../../util/findingEmoji";
import { Container, TableContainer, Grid } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";

const Profile: React.FC<Props> = ({ userData }): JSX.Element => {
  const [isExchangesPresence, setIsExchangesPresence] =
    React.useState<boolean>(null);

  React.useEffect(() => {
    if (userData.exchange.length > 0) {
      setIsExchangesPresence(true);
    } else {
      setIsExchangesPresence(false);
    }
  }, []);
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
                        {userData.profile.adress === ""
                          ? null
                          : `${userData.profile.adress}`}
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
                    {/* {userData.profile.contacts.length === 0 ? null : (
                      <div className="col-sm-9 text-secondary">
                        <select name="username">
                          {userData.profile.contacts.map((user, index) => (
                            <option key={index}>{user}</option>
                          ))}
                        </select>
                      </div>
                    )} */}
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <a id="Allbutton" className="btn" href="/profile/edit">
                        Edit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isExchangesPresence ? (
              <Container maxWidth="lg">
                <br />
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell key="Item Label's" align="center">
                          Item Label's
                        </TableCell>
                        <TableCell key="Details" align="center">
                          Description
                        </TableCell>
                        <TableCell key="Description" align="center">
                          Category
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userData.profile.ownedItems.map((item, index) => {
                        return (
                          <TableRow key={index + 1}>
                            <TableCell align="center" scope="row">
                              {item.name}
                            </TableCell>
                            <TableCell align="center">
                              {item.description}
                            </TableCell>
                            <TableCell align="center">
                              {findingEmoji(item.category)} {item.category}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <br />
              </Container>
            ) : (
              ""
            )}
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
