import React, { useState } from "react";
import {
  FloatingLabel,
  Container,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import MapBox from "../../MapBox";
import Swal from "sweetalert2";
import { API } from "../../../config/api";
import Navbar from "../Navbar";

function EditProfile() {
  const [counter, setCounter] = useState(0);
  const [map, setMap] = useState(false);
  const closeMap = () => setMap(false);
  const showMap = (e) => {
    e.preventDefault();
    setMap(true);
  };

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // const {name, email, phone} = form;

  const [profile, setProfile] = useState({
    location: "",
    image: "",
  });

  const getUser = async (req, res) => {
    try {
      const response = API.get("/user");

      setForm();
    } catch (error) {
      console.log(error);
    }
  };

  // const {location , image}= profile;

  const formChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const profileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.type == "file" ? e.target.files : e.target.value,
    });
  };

  // console.log(form, profile)

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config1 = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const config2 = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const formData = new FormData();
      formData.set("location", profile.location);
      formData.set("image", profile.image[0], profile.image[0].name);

      const body = JSON.stringify(form);

      const response = await API.patch("/profile", formData, config1);
      const response1 = await API.patch("/user", body, config2);

      Swal.fire({
        title: "Success",
        type: "success",
        icon: "success",
        text: "Your profile have been update!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        setCounter(counter + 1);
        navigate("/profile");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar counter={counter} />
      <Container style={{ marginTop: 100 }}>
        <MapBox map={map} closeMap={closeMap} showMap={showMap} />
        <Row>
          <Col>
            <h3 style={{ marginLeft: 10 }}>Edit Profile</h3>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm>
                  <Form.Group className="mb-3">
                    <Form.Control
                      onChange={formChange}
                      name="name"
                      style={{
                        backgroundColor: "rgba(210, 210, 210, 0.25)",
                        border: "2px solid #766C6C",
                        marginLeft: 0,
                        width: 900,
                      }}
                      type="text"
                      placeholder="Full Name"
                    />
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group className="mb-3">
                    <label className="inputFile" htmlFor="image">
                      <div>
                        <span>Attach Image</span>
                        <span>
                          <FontAwesomeIcon icon={faPaperclip} />
                        </span>
                      </div>
                    </label>
                    <Form.Control
                      onChange={profileChange}
                      name="image"
                      style={{
                        backgroundColor: "rgba(210, 210, 210, 0.25)",
                        border: "2px solid #766C6C",
                        marginLeft: 0,
                      }}
                      type="file"
                      hidden
                      id="image"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3 ">
                <Form.Control
                  onChange={formChange}
                  name="email"
                  style={{
                    backgroundColor: "rgba(210, 210, 210, 0.25)",
                    border: "2px solid #766C6C",
                    marginLeft: 0,
                  }}
                  type="email"
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group className="mb-3 ">
                <Form.Control
                  onChange={formChange}
                  name="phone"
                  style={{
                    backgroundColor: "rgba(210, 210, 210, 0.25)",
                    border: "2px solid #766C6C",
                    marginLeft: 0,
                  }}
                  type="text"
                  placeholder="Phone"
                />
              </Form.Group>
              <Row>
                <Col sm>
                  <Form.Group className="mb-3 ">
                    <Form.Control
                      name="location"
                      onChange={profileChange}
                      style={{
                        backgroundColor: "rgba(210, 210, 210, 0.25)",
                        border: "2px solid #766C6C",
                        marginLeft: 0,
                        width: 877,
                      }}
                      type="text"
                      placeholder="Location"
                    />
                  </Form.Group>
                </Col>
                <Col sm>
                  <Button
                    onClick={showMap}
                    style={{
                      backgroundColor: "#433434",
                      color: "white",
                      border: "none",
                    }}
                    variant="primary"
                    type="submit"
                    className="col-12"
                  >
                    Select On Maps <FontAwesomeIcon icon={faMapMarkedAlt} />
                  </Button>
                </Col>
              </Row>
              <div style={{ textAlign: "end" }}>
                <Button
                  style={{
                    backgroundColor: "#433434",
                    color: "white",
                    border: "none",
                  }}
                  variant="primary"
                  type="submit"
                  className="col-3 mt-5"
                >
                  Save
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default EditProfile;
