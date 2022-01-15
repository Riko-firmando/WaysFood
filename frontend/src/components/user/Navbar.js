import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useContext, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAirFreshener,
  faSpinner,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";

import LoginModal from "./landingPage/LoginModal";
import SignInModal from "./landingPage/SignInModal";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

function Navbar(props) {
  const [counter, setCounter] = useState(0);
  const [carts, setCarts] = useState([]);
  const [user, setUser] = useState({
    profile: {
      image: "",
    },
  });
  const cart = async () => {
    try {
      const response = await API.get("/carts");
      setCarts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await API.get("/user");

      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cart();
    getUser();
  }, []);
  useEffect(() => {
    cart();
    getUser();
  }, [props.counter, counter]);

  const [state, dispatch] = useContext(UserContext);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: "",
    });
  };

  // register
  const [SignIn, setSignIn] = useState(false);

  const closeSignIn = () => setSignIn(false);
  const showSignIn = () => setSignIn(true);

  // modal login
  const [Login, setLogin] = useState(false);

  const closeLogin = () => setLogin(false);
  const showLogin = () => setLogin(true);

  const dropDownUs = () => {
    return (
      <div className="Dropdown">
        <img
          className="profileImg"
          style={{ position: "relative" }}
          src={user.profile.image}
          alt=""
        />
        <div className="dropDownUs">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={"/profile"}
          >
            <div
              style={{
                display: "flex",
                padding: "12px 15px",
                paddingRight: 50,
              }}
            >
              <div>
                <FontAwesomeIcon icon={faUser} color="#433434" />
              </div>
              <span style={{ marginLeft: 10 }}>Profile</span>
            </div>
          </Link>
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            <div
              id="logout"
              style={{
                display: "flex",
                padding: "12px 15px",
                paddingRight: 50,
              }}
            >
              <div>
                <FontAwesomeIcon icon={faSignOutAlt} color="#974A4A" />
              </div>
              <button
                onClick={logout}
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <span style={{ marginLeft: 10 }}>Logout</span>
              </button>
            </div>
          </Link>
        </div>
      </div>
    );
  };

  const dropDownAd = () => {
    return (
      <div className="Dropdown">
        <img
          className="profileImg"
          style={{ position: "relative" }}
          src={user.profile.image}
          alt=""
        />
        <div className="dropDownUs">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/profile"
          >
            <div
              style={{
                display: "flex",
                padding: "12px 20px",
                paddingRight: 50,
              }}
            >
              <div>
                <FontAwesomeIcon icon={faUser} color="#433434" />
              </div>
              <span style={{ marginLeft: 15 }}>
                <b>Profile</b>
              </span>
            </div>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/add-product"
          >
            <div
              style={{
                display: "flex",
                padding: "12px 20px",
                paddingRight: 50,
              }}
            >
              <div>
                <img src="/food.png" alt="" height="25px" />
              </div>
              <span style={{ marginLeft: 10 }}>
                <b>AddProduct</b>
              </span>
            </div>
          </Link>
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            <div
              style={{
                display: "flex",
                padding: "12px 20px",
                paddingRight: 50,
                borderTop: "1px solid black",
              }}
            >
              <div>
                <FontAwesomeIcon icon={faSignOutAlt} color="#974A4A" />
              </div>
              <button
                onClick={logout}
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <span style={{ marginLeft: 15 }}>
                  <b>Logout</b>
                </span>
              </button>
            </div>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="navbar">
        <div className="logo" style={{ display: "flex" }}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={state.user.role == "owner" ? "/admin" : "/"}
          >
            <span>WaysFood</span>
            <img src="/Vector.png" alt="" />
          </Link>
        </div>
        <div className="options">
          {!state.isLogin ? (
            <Button onClick={showSignIn}>Register</Button>
          ) : state.user.role == "customer" ? (
            <Link to="/cart">
              <div className="cartSpace">
                <img
                  className="cartImg"
                  style={{ marginRight: 20 }}
                  src="/cart.png"
                  alt=""
                />{" "}
                <div className="cartQty">
                  <span>{carts.length}</span>
                </div>
              </div>
            </Link>
          ) : (
            ""
          )}
          <SignInModal
            Login={Login}
            closeLogin={closeLogin}
            showLogin={showLogin}
            SignIn={SignIn}
            closeSignIn={closeSignIn}
            showSignIn={showSignIn}
          />

          {!state.isLogin ? (
            <Button onClick={showLogin}>Login</Button>
          ) : state.user.role == "customer" ? (
            dropDownUs()
          ) : (
            dropDownAd()
          )}
          <LoginModal
            isLogin={state.isLogin}
            Login={Login}
            closeLogin={closeLogin}
            showLogin={showLogin}
            SignIn={SignIn}
            closeSignIn={closeSignIn}
            showSignIn={showSignIn}
            carts={cart}
            setCounter={setCounter}
            counter={counter}
          />
        </div>
      </div>
    </>
  );
}

export default Navbar;
