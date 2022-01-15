import "./menus.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
} from "react-router-dom";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import { API } from "../../../config/api";
import Navbar from "../Navbar";

function Menus() {
  const [counter, setCounter] = useState(0);
  const [products, setProducts] = useState([]);
  const [owner, setOwner] = useState();
  const location = useLocation();
  const id = location.state;
  // Fetching product data from database
  const getProducts = async () => {
    try {
      const response = await API.get(`/products/${id}`);
      // Store product data to useState variabel
      setProducts(response.data.data);
      setOwner(response.data.owner.name);
    } catch (error) {
      console.log(error);
    }
  };

  const addCart = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const cart = {
        productID: id,
        qty: 1,
      };

      const body = JSON.stringify(cart);
      const response = await API.post("/cart", body, config);

      Swal.fire({
        title: "Success",
        type: "success",
        icon: "success",
        text: "success add to cart",
        showConfirmButton: false,
        timer: 500,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Navbar counter={counter} />
      <Container>
        <div className="list-menus">
          <h3>{owner}, Menus</h3>
          <div className="menus">
            {products.map((data, idx) => (
              <div className="menu" key={idx}>
                <img src={data.image} alt="" height="130px" width={200} />
                <b>{data.title}</b>
                <span>
                  <NumberFormat
                    value={data.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix="Rp "
                  />
                </span>
                <button
                  onClick={() => {
                    addCart(data.id);
                    setCounter(counter + 1);
                  }}
                >
                  Order
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="footer" style={{ height: 100 }}></div>
      </Container>
    </>
  );
}

export default Menus;
