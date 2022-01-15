import "./cart.css";
import { Container, Row, Col, Button, fullscreen } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faMapMarkedAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";
import NumberFormat from "react-number-format";
import { API } from "../../../config/api";
import Swal from "sweetalert2";

import MapBox from "../../MapBox";
import Navbar from "../Navbar";

function Cart() {
  const [counter, setCounter] = useState(0);
  const Navigate = useNavigate();
  // map
  const [map, setMap] = useState(false);
  const closeMap = () => setMap(false);
  const showMap = () => setMap(true);

  // carts
  const [carts, setCarts] = useState([]);
  const cart = async () => {
    const response = await API.get("/carts");
    setCarts(response.data.data);
  };

  // console.log(carts[0].product.userID)

  // update carts
  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      let data = e.target.dataset;

      let prevQty = parseInt(data.qty);
      let count = parseInt(data.count);
      let id = data.id;

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      var quantity = { qty: prevQty + count };
      // Data body
      const body = JSON.stringify(quantity);
      const response = await API.patch("/cart/" + id, body, config);

      cart();
    } catch (error) {
      console.log(error);
    }
  };

  const changeQty = (e) => {
    // let data = e.target.dataset;
    //     let id = data.id;
    //     let idx = data.idx;
    // const newQty = e.target.value;
    // setCarts([{
    //     ...carts,
    //     [carts[idx].qty] : newQty
    // }])
    // console.log(carts[idx].qty)
  };

  const deleteCart = async (id) => {
    try {
      const response = await API.delete("cart/" + id);
      cart();
    } catch (error) {
      console.log(error);
    }
  };

  var total = 0;
  var subtotal = 0;
  var jumlah = carts.length;
  carts.forEach((data) => {
    total = data.product.price * data.qty;
    subtotal += total;
  });
  total = subtotal + 10000;

  const addTransaction = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({
        sellerID: carts[0].product.userID,
        price: total,
      });
      var response = await API.post("/transaction", body, config);
      // console.log(response)
      carts.forEach(async (cart) => {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const body = JSON.stringify({
          productID: cart.productID,
          transactionID: response.data.data.id,
          qty: cart.qty,
        });

        await API.post("/order", body, config);
        Swal.fire({
          title: "Success",
          type: "success",
          icon: "success",
          text: "wait for your orders",
          showConfirmButton: false,
          timer: 1500,
        });

        await API.delete("/cart/" + cart.id);
        setTimeout(() => {
          Navigate("/profile");
        }, 1500);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cart();
  }, []);

  const cartPage = () => (
    <Container>
      <MapBox map={map} closeMap={closeMap} showMap={showMap} />
      <div className="list-cart">
        <h3>Geprek Bensu</h3>
        <span style={{ color: "#613D2B" }}>Delivery Location</span>
        <div style={{ marginBottom: 10, marginTop: 10 }}>
          <input type="text" value="Ciwaruga" style={{ width: 804 }} />
          <button
            onClick={showMap}
            className="maps"
            style={{ width: 222, marginLeft: 10 }}
          >
            Select On Map <FontAwesomeIcon icon={faMapMarkedAlt} />
          </button>
        </div>
        <span style={{ color: "#613D2B" }}>Review Your Order</span>
        <div style={{ display: "flex" }}>
          <div className="carts">
            {carts.map((data, idx) => (
              <div className="cart" key={idx}>
                <img width="120px" src={data.image} alt="" height={80} />
                <div className="info">
                  <span>
                    <b>{data.product.title}</b>
                  </span>
                  <div className="qty">
                    <span
                      onClick={handleUpdate}
                      data-id={data.id}
                      data-qty={data.qty}
                      data-count={-1}
                    >
                      -
                    </span>
                    <input
                      type="number"
                      onChange={changeQty}
                      data-id={data.id}
                      data-idx={idx}
                      value={data.qty}
                    />
                    <span
                      onClick={handleUpdate}
                      data-id={data.id}
                      data-qty={data.qty}
                      data-count={1}
                    >
                      +
                    </span>
                  </div>
                </div>
                <div className="price">
                  <span
                    style={{
                      color: "#FF0000",
                      display: "block",
                      marginBottom: 20,
                    }}
                  >
                    <NumberFormat
                      value={data.product.price * data.qty}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix="Rp "
                    />
                  </span>
                  <span
                    onClick={() => {
                      deleteCart(data.id);
                      setCounter(counter + 1);
                    }}
                    data-id={data.id}
                    style={{ color: "#613D2B", cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="priceCarts">
            <div className="subtotal">
              <div>
                <span>Subtotal</span>
                <span>Qty</span>
                <span>Ongkir</span>
              </div>
              <div className="value">
                <span style={{ color: "#FF0000" }}>
                  <NumberFormat
                    value={subtotal}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix="Rp "
                  />
                </span>
                <span>{jumlah}</span>
                <span style={{ color: "#FF0000" }}>Rp 10,000</span>
              </div>
            </div>
            <div className="total">
              <div>
                <span>Total</span>
              </div>
              <div>
                <span>
                  <NumberFormat
                    value={total}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix="Rp "
                  />
                </span>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button className="footBtn" onClick={addTransaction}>
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer"></div>
    </Container>
  );

  const empty = () => (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        marginTop: 60,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h3>Your cart is empty</h3>
      <iframe
        src="https://embed.lottiefiles.com/animation/629"
        style={{ width: 300, height: 300 }}
      ></iframe>
      <Link to="/">
        <button className="button">continue shipping</button>
      </Link>
    </div>
  );
  return (
    <>
      <Navbar counter={counter} />
      {carts.length == 0 ? empty() : cartPage()}
    </>
  );
}

export default Cart;
