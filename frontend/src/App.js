import "./App.css";
import React, { useState, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";

import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";

// components user
import Navbar from "./components/user/Navbar";
import LandingPage from "./components/user/landingPage/LandingPage";
import Menus from "./components/user/menus/Menus";
import Cart from "./components/user/cart/Cart";
import Profile from "./components/user/profile/Profile";
import EditProfile from "./components/user/editProfile/EditProfile";

// component admin
import AdminHome from "./components/admin/landingPage/AdminHome";
import AddPro from "./components/admin/addProduct/AddPro";

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const [state, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div style={{ backgroundColor: "#E5E5E5", minHeight: "100vh" }}>
      {/* {roleID == 2 ? userPage() : adminPage()} */}
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="menu" element={<Menus />} />
          <Route exact path="cart" element={<Cart />} />
          <Route exact path="profile" element={<Profile />} />
          <Route exact path="edit-profile" element={<EditProfile />} />
          {/* admin */}
          <Route exact path="/admin" element={<AdminHome />} />
          <Route exact path="add-product" element={<AddPro />} />
        </Routes>
      </Router>
      <div className="footer" style={{ height: 100 }}></div>
    </div>
  );
}

export default App;
