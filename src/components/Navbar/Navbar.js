import React, { useEffect } from "react";
import {
  Navbar,
  Nav,
  Dropdown,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { GoogleLogout } from "react-google-login";
// import action types needed and actions for dispatching
import { LOGOUT } from "../../constants/actionTypes";
import { getUsers } from '../../actions/users'
// import icons from react-icons library
import { BsChevronDown } from "react-icons/bs";
import { BsSearch } from 'react-icons/bs'

function NavbarComp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    e.preventDefault();
    setSearchParams(e.target.value);
  }
  
  let currentUser = JSON.parse(localStorage.getItem("profile"))?.result;
  let id = currentUser?._id || currentUser?.googleId;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, id])

  const clientId = process.env.REACT_APP_clientId;

  const googleLogoutSuccess = () => {
    dispatch({ type: LOGOUT });

    navigate("/auth");
  };

  return (
    <Navbar
      className="d-flex navbar"
    >
      <Link to="/" className="logo_linktohome">
        <Navbar.Brand className="d-flex align-items-center">
          <div className="d-flex logo text-center">
            <div className="logo_it text-center">IT</div>
            <div className="logo_hub text-center" >HUB</div>
          </div>
        </Navbar.Brand>
      </Link>
      <Nav className="me-auto"></Nav>
      <div className="custom-links d-flex flex-row">
        {(currentUser) ? (
          <>
            <div className="d-flex align-items-center">

              <div className="d-flex align-items-center">
                <div className="input-group">
                  <input type="text" className="form-control navbar_search_input" placeholder="Search" aria-label="Search"
                    aria-describedby="basic-addon2" />
                  <div className="input-group-append">
                    <span className="input-group-text navbar_search" id="search-btn"><BsSearch size="25" /></span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                {<img
                  alt="avatar"
                  className="navbar_avatar"
                  src={currentUser.imageUrl}
                />
                }
                <Dropdown className="d-flex align-self-center align-items-center justify-content-center">
                  <Dropdown.Toggle variant="cleared" >
                    <BsChevronDown />
                  </Dropdown.Toggle>
                  <Dropdown.Menu align={"end"}>
                    <Link className="p-3 link" to={`/${currentUser.username || currentUser.username}`}>{currentUser.name || currentUser.name}</Link>
                    <Dropdown.Item>
                      <span>Settings</span>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <GoogleLogout
                        render={(renderprops) => (
                          <div
                            style={{ color: "red" }}
                            onClick={renderprops.onClick}
                          >
                            Log out
                          </div>
                        )}
                        clientId={clientId}
                        onLogoutSuccess={googleLogoutSuccess}
                      />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link style={{ color: "white" }} to="auth">
              Sign In
            </Link>
          </>
        )}
      </div>
    </Navbar>
  );
}

export default NavbarComp;
