import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav
      id="navbarColor"
      className="navbar p-2 navbar-expand-lg navbar navbar-light fixed-top "
    >
      <img
        src="https://image.shutterstock.com/z/stock-vector-business-people-replacement-line-icon-linear-style-sign-for-mobile-concept-and-web-design-1649442850.jpg"
        alt=""
        width={30}
        height={40}
      />
      <a className="navbar-brand" href="/">
        <h3>Akijaypraytay</h3>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link href="/dashboard/">
              <a className="nav-link">Dashboard</a>
            </Link>
          </li>
          <li className="nav-item ">
            <Link href="/history/">
              <a className="nav-link">History</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/create/">
              <a className="nav-link">Create</a>
            </Link>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="#">
              Notification
            </a>
          </li> */}
        </ul>
        {/* dropdown */}
<<<<<<< HEAD
        <div className="container">
          {/* <div className="dropdown d-flex flex-row-reverse"> */}
          <div className="dropdown d-flex justify-content-end">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
=======
        <div
          id="buttonLogin"
          className="dropdown dropdown position-absolute top-50 end-0 translate-middle"
        >
          <button
            className="btn text-black dropdown-toggle "
            type="button"
            id="Allbutton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7em"
              height="2em"
              fill="white"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
>>>>>>> 1ecdfa05de8fd7e0ac9e5a7981fb9c915120e05c
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7em"
                height="2em"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link href="/profile">
                  <a className="dropdown-item">Account</a>
                </Link>
              </li>
              <li>
                <Link href="/api/login">
                  <a className="dropdown-item">Login</a>
                </Link>
              </li>
              <li>
                <Link href="/api/logout">
                  <a className="dropdown-item" href="/api/logout">
                    Logout
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
