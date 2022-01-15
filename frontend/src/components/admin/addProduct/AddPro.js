import { useState } from "react";
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
import Swal from "sweetalert2";

import { API, setAuthToken } from "../../../config/api";
import Navbar from "../../user/Navbar";

function AddPro() {
  const navigate = useNavigate();
  const [product, setproduct] = useState({
    title: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setproduct({
      ...product,
      [e.target.name]:
        e.target.type == "file" ? e.target.files : e.target.value,
    });

    // for preview image
    // if(e.target.type == "file"){
    //     let url = URL.createObjectURL(e.target.files[0]);
    // }
  };

  console.log(product);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Create Configuration Content-type here ...
      // Content-type: multipart/form-data
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Create store data with FormData as object here ...
      const formData = new FormData();
      formData.set("title", product.title);
      formData.set("price", product.price);
      formData.set("image", product.image[0], product.image[0].name);

      // Insert product data here ...
      const response = await API.post("/product", formData, config);

      Swal.fire({
        title: "Success",
        type: "success",
        icon: "success",
        text: "Your product have been update!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: 100 }}>
        <Row>
          <Col>
            <h3 style={{ marginLeft: 10 }}>Add Product</h3>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm>
                  <Form.Group className="mb-3">
                    <Form.Control
                      name="title"
                      onChange={handleChange}
                      style={{
                        backgroundColor: "rgba(210, 210, 210, 0.25)",
                        border: "2px solid #766C6C",
                        marginLeft: 0,
                        width: 900,
                      }}
                      type="text"
                      placeholder="Title"
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
                      name="image"
                      onChange={handleChange}
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
                  name="price"
                  onChange={handleChange}
                  style={{
                    backgroundColor: "rgba(210, 210, 210, 0.25)",
                    border: "2px solid #766C6C",
                    marginLeft: 0,
                  }}
                  type="number"
                  placeholder="Price"
                />
              </Form.Group>
              <div style={{ textAlign: "end" }}>
                <Button
                  style={{
                    backgroundColor: "#433434",
                    color: "white",
                    border: "none",
                  }}
                  variant="primary"
                  type="submit"
                  className="col-3 mt-3"
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

export default AddPro;
