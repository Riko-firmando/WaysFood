import { Container, Row, Col, Table, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { API } from "../../../config/api";
import Navbar from "../../user/Navbar";

function AdminHome() {
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async () => {
    const response = await API.get("/transactions");
    setTransactions(response.data.data);
  };

  const updateTransaction = async (id, status) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = {
        status: status,
      };

      const response = await API.patch("/transaction/" + id, body, config);
      getTransactions();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: 50 }}>
        <Row>
          <Col>
            <h3 style={{ marginLeft: 10 }} className="mt-4 mb-5">
              Income Transaction
            </h3>
            <Table bordered hover style={{ borderColor: "#828282" }}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Products Order</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "white" }}>
                {transactions.map((transaction, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: "center" }}>{idx + 1}</td>
                    <td>{transaction.user.name}</td>
                    <td>{transaction.user.profile.location}</td>
                    <td>
                      {transaction.orders.map((order, idx) => (
                        <div key={idx}>
                          <span>{order.product.title}</span>
                          <br />
                        </div>
                      ))}
                    </td>
                    <td>
                      {transaction.status == "pending" ? (
                        <span style={{ color: "#FF9900" }}>Awaiting</span>
                      ) : transaction.status == "finish" ? (
                        <span style={{ color: "#78A85A" }}>success</span>
                      ) : transaction.status == "failed" ? (
                        <span style={{ color: "#E83939" }}>failed</span>
                      ) : transaction.status == "otw" ? (
                        <span style={{ color: "#00D1FF" }}>On the Way</span>
                      ) : (
                        ""
                      )}{" "}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {transaction.status == "pending" ? (
                        <>
                          {" "}
                          <Badge
                            onClick={() =>
                              updateTransaction(transaction.id, "failed")
                            }
                            bg="danger"
                            style={{ cursor: "pointer" }}
                          >
                            Cancel
                          </Badge>{" "}
                          <Badge
                            onClick={() =>
                              updateTransaction(transaction.id, "finish")
                            }
                            style={{ cursor: "pointer" }}
                            bg="success"
                          >
                            Approve
                          </Badge>{" "}
                        </>
                      ) : transaction.status == "finish" ||
                        transaction.status == "otw" ? (
                        <>
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            color="#3BB54A"
                          />{" "}
                        </>
                      ) : transaction.status == "failed" ? (
                        <>
                          <FontAwesomeIcon
                            icon={faTimesCircle}
                            color="#D1403F"
                          />{" "}
                        </>
                      ) : (
                        ""
                      )}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminHome;
