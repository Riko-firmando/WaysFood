import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { API } from "../../../config/api";

function SignInModal(props) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    phone: "",
  });

  const { email, password, name, gender, phone } = form;

  const handleChange = (e) => {
    const role = document.getElementById("role").value;
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      role,
    });

    console.log(e.target.value);
    console.log(role);
  };

  const handleSubmit = async (e) => {
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

    // Insert data user to database here ...
    const response = await API.post("/register", body, config);

    if (response.data.error) {
      let errorMsg = document.getElementById("errorMsg");
      errorMsg.innerHTML = response.data.error;
    } else {
      errorMsg.innerHTML = "";
      props.closeSignIn();
      Swal.fire({
        title: "Register Success",
        type: "success",
        icon: "success",
        text: "Please Login!",
        showConfirmButton: false,
        timer: 2000,
      });
      props.showLogin();
    }

    console.log(response);
  };

  return (
    <>
      <Modal show={props.SignIn} onHide={props.closeSignIn} centered size="sm">
        <Modal.Body>
          <h4 style={{ color: "#FFC700" }}>Register</h4>
          <span id="errorMsg"></span>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-4">
              <Form.Control
                onChange={handleChange}
                name="email"
                value={email}
                style={{
                  backgroundColor: "rgba(210, 210, 210, 0.25)",
                  border: "2px solid #D2D2D2",
                  marginLeft: 0,
                }}
                type="text"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Control
                onChange={handleChange}
                name="password"
                value={password}
                style={{
                  backgroundColor: "rgba(210, 210, 210, 0.25)",
                  border: "2px solid #D2D2D2",
                  marginLeft: 0,
                }}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Control
                onChange={handleChange}
                name="name"
                value={name}
                style={{
                  backgroundColor: "rgba(210, 210, 210, 0.25)",
                  border: "2px solid #D2D2D2",
                  marginLeft: 0,
                }}
                type="text"
                placeholder="Full Name"
              />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Control
                onChange={handleChange}
                name="gender"
                value={gender}
                style={{
                  backgroundColor: "rgba(210, 210, 210, 0.25)",
                  border: "2px solid #D2D2D2",
                  marginLeft: 0,
                }}
                type="text"
                placeholder="Gender"
              />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Control
                onChange={handleChange}
                name="phone"
                value={phone}
                style={{
                  backgroundColor: "rgba(210, 210, 210, 0.25)",
                  border: "2px solid #D2D2D2",
                  marginLeft: 0,
                }}
                type="text"
                placeholder="Phone"
              />
            </Form.Group>
            <Form.Select
              id="role"
              name="role"
              onChange={handleChange}
              style={{
                backgroundColor: "rgba(210, 210, 210, 0.25)",
                border: "2px solid #D2D2D2",
              }}
              aria-label="Default select example"
            >
              <option value="customer" selected>
                As User
              </option>
              <option value="owner">As Admin</option>
            </Form.Select>
            <Button
              style={{
                backgroundColor: "#433434",
                color: "white",
                border: "none",
              }}
              variant="primary"
              type="submit"
              className="col-12 mt-4 mb-3"
            >
              Register
            </Button>
            <div style={{ textAlign: "center" }}>
              <span className="showSignIn">
                Already have an account? Klik{" "}
                <a
                  onClick={() => {
                    props.closeSignIn();
                    props.showLogin();
                  }}
                >
                  <b>Here</b>
                </a>
              </span>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignInModal;
// render(<TesModal/>);
