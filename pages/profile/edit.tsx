import React from "react";
import { connectToDatabase } from "../../util/mongodb";
import { useState } from "react";
import { GetServerSideProps } from "next";
import { Users } from "../../data/types/users";
import { Props } from "../../data/types/props";
import { checkingConnection } from "../../util/checkingConnection";
const Profile: React.FC<Props> = ({ userData }): JSX.Element => {
  const [displayAdress] = React.useState(userData.profile.adress);
  const [displayPhone] = React.useState(userData.profile.phone);
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
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">test</div>
                    <div className="col-sm-9 text-secondary">
                      <form method="POST" action="/api/edit">
                        <div className="form-group">
                          <input
                            type="username"
                            className="form-control"
                            name="userName"
                            placeholder="Enter Username"
                            required
                            minLength={3}
                            maxLength={9}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="number"
                            className="form-control"
                            name="phone"
                            placeholder="Enter Phone Number "
                            required
                            minLength={3}
                            maxLength={10}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="adress"
                            className="form-control"
                            name="adress"
                            placeholder="Enter Adress"
                            required
                            minLength={5}
                            maxLength={20}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Valider
                        </button>
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

// const Profile: React.FC<Props> = ({ userData }): JSX.Element => {
//   const [userName, setUserName] = useState<string>("");
//   return (
//     <div className="container">
//       <div className="main-body">
//         <div className="row">
//           <div className="col-lg-4">
//             <div className="card">
//               <div className="card-body">
//                 <div className="d-flex flex-column align-items-center text-center">
//                   <img
//                     src="https://bootdey.com/img/Content/avatar/avatar6.png"
//                     alt="Admin"
//                     className="rounded-circle p-1 bg-primary"
//                     width="300"
//                     height="300"
//                   />
//                   <div className="mt-3">
//                     <p className="text-secondary mb-1">
//                       Username :{userData.profile.username}
//                     </p>

//                     <p className="text-secondary mb-1">
//                       Email : {userData.profile.mail}
//                     </p>

//                     <p className="text-muted font-size-sm"></p>
//                   </div>
//                 </div>
//                 <hr className="my-4" />
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-8">
//             <div className="card">
//               <div className="card-body">
//                 <div className="row mb-3">
//                   <div className="col-sm-3">
//                     <h6 className="mb-0">Full Name</h6>
//                   </div>

//                   <form method="POST" action="/api/edit">
//                     <div className="form-group">
//                       <label>Username</label>
//                       <input
//                         type="username"
//                         className="form-control"
//                         name="userName"
//                         placeholder="Enter Username"
//                         required
//                         minLength={3}
//                         maxLength={9}
//                         onChange={(event): void => {
//                           setUserName(event.target.value);
//                         }}
//                       />
//                     </div>

//                     <button type="submit" className="btn btn-primary">
//                       Valider
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const userToken = context.req.cookies.token;

//   const checkConnectionValidity = await checkingConnection(userToken);
//   console.log("DB", checkConnectionValidity);

//   return checkConnectionValidity;
// };
