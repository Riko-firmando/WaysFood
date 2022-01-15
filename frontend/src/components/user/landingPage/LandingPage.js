import "./landingPage.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Navbar from "../Navbar";

const restaurants = [
  {
    id: 1,
    nama: "Burger King",
    gambar: "/restaurants/Burgerking.png",
    Link: "menu",
    ownerID: 27,
  },
  {
    id: 2,
    nama: "Starbucks",
    gambar: "/restaurants/starbucks.png",
    Link: "menu",
    ownerID: 27,
  },
  {
    id: 3,
    nama: "KFC",
    gambar: "/restaurants/KFC.png",
    Link: "menu",
    ownerID: 27,
  },
  {
    id: 4,
    nama: "jco",
    gambar: "/restaurants/jco.png",
    Link: "menu",
    ownerID: 27,
  },
];

const nearResto = [
  {
    id: 1,
    nama: "Geprek Bensu",
    gambar: "/nearResto/w644 1.png",
    jarak: "0.2 KM",
    Link: "menu",
    ownerID: 2,
  },
  {
    id: 2,
    nama: "Nasi Goreng Mas Rony",
    gambar: "/nearResto/w644 1-1.png",
    jarak: "0.6 KM",
    Link: "/",
    ownerID: 2,
  },
  {
    id: 3,
    nama: "Pecel Ayam Prambanan",
    gambar: "/nearResto/w644 1-2.png",
    jarak: "0.6 KM",
    Link: "/",
    ownerID: 2,
  },
  {
    id: 4,
    nama: "Kopi Kenangan",
    gambar: "/nearResto/w644 1-3.png",
    jarak: "1.6 KM",
    Link: "/",
    ownerID: 2,
  },
];

function LandingPage(props) {
  return (
    <>
      <Navbar />
      <div className="hero">
        <div className="label">
          <h1>Are You Hungry ?</h1>
          <h1>Express Home Delivery</h1>
          <div className="paragraph">
            <hr />
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
        <div style={{ marginLeft: 20 }}>
          <img src="/pizza.png" alt="" />
        </div>
      </div>
      <div className="restaurants">
        <h3>Popular Restaurant</h3>
        <div className="popular">
          {restaurants.map((data, idx) => (
            <Link
              key={idx}
              style={{ textDecoration: "none", color: "black" }}
              to="menu"
              state={data.ownerID}
            >
              <div className="restaurant">
                <img height="50px" src={data.gambar} alt="" />
                <b>{data.nama}</b>
              </div>
            </Link>
          ))}
        </div>
        <h3>Restaurant Near You</h3>
        <div className="nearRestos">
          {nearResto.map((data, idx) => (
            <Link
              key={idx}
              style={{ textDecoration: "none", color: "black" }}
              to="menu"
              state={data.ownerID}
            >
              <div className="nearResto" key={data.id}>
                <img width="190px" src={data.gambar} alt="" />
                <div className="info">
                  <b>{data.nama}</b>
                  <br />
                  <span>{data.jarak}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default LandingPage;
