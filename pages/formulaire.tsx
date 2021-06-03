import React from "react";

const CreateUser: React.FC = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <>
      <div className="container">
        <form
          method="POST"
          action="/api/create_user"
          className="bg-white p-4 border border-dark rounded mt-5"
        >
          <fieldset>
            <h1 className="text-center text-dark">
              Sign up for a free account
            </h1>
            <div className="row text-center mt-4">
              <div className="form-group col-6">
                <input
                  placeholder="First Name"
                  className="form-control"
                  id="userfirstname"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div className="form-group col-6">
                <input
                  placeholder="Last Name"
                  className="form-control"
                  id="userlastnameg"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <input
                placeholder="Email :"
                className="form-control"
                id="useremail"
                type="text"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Create password"
                className="form-control"
                id="password"
                type="text"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </fieldset>
          <div className="row text-center mt-2 p-3">
            <button className="btn btn-primary text-center" id="validateAdd">
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
