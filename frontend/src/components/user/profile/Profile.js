import "./profile.css";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import NumberFormat from "react-number-format";
import { API } from "../../../config/api";

import Navbar from "../Navbar";

const profile = {
  nama: "Jhon",
  email: "Jhojo@gmail.com",
  phone: "081244892238",
  gambar: "/profile/Rectangle 12.png",
};

function Profile() {
  const [user, setUser] = useState({
    email: "",
    gender: "",
    id: "",
    name: "",
    phone: "",
    products: "",
    profile: {
      id: "",
      image: "",
      location: "",
    },
    role: "",
  });
  const [transactions, setTransactions] = useState([
    {
      status: "",
      user: {
        email: "",
        name: "",
        gender: "",
        phone: "",
        role: "",
      },
      seller: {
        email: "",
        name: "",
        gender: "",
        phone: "",
        role: "",
      },
      orders: [
        {
          qty: "",
          product: {
            title: "",
            price: "",
            image: "",
          },
        },
      ],
    },
  ]);
  const getData = async () => {
    try {
      const response = await API.get("/user");
      setUser(response.data.data);
      const response2 = await API.get(
        response.data.data.role == "customer"
          ? "/my-transaction"
          : "/transactions"
      );
      setTransactions(response2.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <div className="profileContent">
          <div className="profile">
            <h3>
              {user.role == "customer" ? "My Profile" : "Profile Partner"}
            </h3>
            <div style={{ display: "flex" }}>
              <div>
                <Link to="../edit-profile">
                  <img
                    height="200px"
                    width={175}
                    style={{ backgroundColor: "white" }}
                    src={user.profile.image}
                    alt=""
                  />
                </Link>
                <div style={{ textAlign: "center" }}>
                  <Link to="../edit-profile">
                    <button className="editPro">Edit Profile</button>
                  </Link>
                </div>
              </div>
              <div className="profile-info">
                <div>
                  <h6 style={{ color: "#613D2B" }}>
                    {user.role == "customer" ? "Full Name" : "Name Partner"}
                  </h6>
                  <span>{user.name}</span>
                </div>
                <div>
                  <h6 style={{ color: "#613D2B" }}>Email</h6>
                  <span>{user.email}</span>
                </div>
                <div>
                  <h6 style={{ color: "#613D2B" }}>Phone</h6>
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="History">
            <h3>
              {user.role == "customer"
                ? "History Transaction"
                : "History Order"}
            </h3>
            {transactions.map((transaction, idx) => (
              <div className="myOrder mt-2" key={idx}>
                <div>
                  <h5>
                    <b>
                      {user.role == "customer"
                        ? transaction.seller.name
                        : transaction.user.name}
                    </b>
                  </h5>
                  <span>
                    {dateFormat(transaction.createdAt, "dddd, d mmmm yyyy")}
                  </span>
                  <h6>
                    Total :{" "}
                    <NumberFormat
                      value={transaction.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp"}
                    />
                  </h6>
                </div>
                <div style={{ flex: "1", textAlign: "end" }}>
                  <h5>
                    WaysFood <img src="/Vector.png" alt="" />
                  </h5>
                  <span
                    className={
                      transaction.status == "finish"
                        ? "status-finish"
                        : transaction.status == "pending"
                        ? "status-pending"
                        : "status-failed"
                    }
                  >
                    {transaction.status == "finish"
                      ? "Finished"
                      : transaction.status == "pending"
                      ? "Awaiting"
                      : "Failed"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Profile;
