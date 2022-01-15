import { Button, Modal, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import React from "react";
// import {useHistory} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SignInModal from "./SignInModal";
import { API } from "../../../config/api";
import { UserContext } from "../../../context/userContext";

function LoginModal(props) {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Create Configuration Content-type here ...
      // Content-type: application/json
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Convert form data to string here ...
      const body = JSON.stringify(form);

      // Insert data user for login process here ...
      const response = await API.post("/login", body, config);

      console.log(response.data.data);
      // Checking process
      if (response.status == 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        // console.log(state);

        // // Status check
        if (response.data.data.role == "owner") {
          navigate("/admin");
        } else {
          navigate("/");
        }
        props.setCounter(props.counter + 1);

        props.closeLogin();
        // props.carts();
      }
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  return (
    <>
      <Modal show={props.Login} onHide={props.closeLogin} centered size="sm">
        <Modal.Body>
          <h4 style={{ color: "#FFC700" }}>Login</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-4 " controlId="formBasicEmail">
              <Form.Control
                onChange={handleChange}
                value={email}
                name="email"
                value={email}
                style={{
                  backgroundColor: "rgba(210, 210, 210, 0.25)",
                  border: "2px solid #D2D2D2",
                }}
                type="email"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicPassword">
              <Form.Control
                onChange={handleChange}
                value={password}
                name="password"
                value={password}
                style={{
                  backgroundColor: "rgba(210, 210, 210, 0.25)",
                  border: "2px solid #D2D2D2",
                }}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button
              onClick={props.isLogin ? props.closeLogin : ""}
              style={{
                backgroundColor: "#433434",
                color: "white",
                border: "none",
              }}
              variant="primary"
              type="submit"
              className="col-12 mt-2 mb-3"
            >
              Login
            </Button>
            <div style={{ textAlign: "center" }}>
              <span className="showSignIn">
                Dont have an account? Klik{" "}
                <a
                  onClick={() => {
                    props.closeLogin();
                    props.showSignIn();
                  }}
                >
                  <b>Here</b>
                </a>
              </span>
              <SignInModal
                SignIn={props.SignIn}
                closeSignIn={props.closeSignIn}
                showSignIn={props.showSignIn}
              />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;

// render(<TesModal/>);
