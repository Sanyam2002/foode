import React, { useEffect, useContext,useState } from "react";
import "../about.css";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import axios from "axios";
import SweetAlertContext from "./context/SweetAlertContext";

export const About = () => {
  const { toggle, addminus } = useContext(SweetAlertContext);
  useEffect(() => {
    addminus();
  });
  useEffect(() => {
    toggle();
  }, []);

  const [profileData, setProfileData] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url:"/profile",
    })
    .then((response) => {
      const res =response.data
      setProfileData(({
        profile_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  return (
    <>
      <Navbar />
      <section id="box">
        <div id="box1">
          <img
            src={"../img/img1.png"}
            alt=""
            style={{ height: "400px", width: "500px" }}
          />
        </div>

        <div id="box2">
          <h4 className="heading1">WE HAVE EVERYTHING YOU NEED ?</h4>
          <p className="para">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            magnam accusantium at placeat hic officia nisi veritatis qui
            eligendi, porro alias temporibus omnis! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Voluptatibus deserunt, doloremque
            mollitia, placeat sit praesentium harum aliquid atque dignissimos
          </p>
          <button className="btn1">
            <a href="#"> Contact Us</a>
          </button>
        </div>
      </section>

      <section className="try">
        <div className="box6">
          <h2 className="heading1">What we Provide?</h2>
          <p className="para3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua minim.
          </p>
        </div>
        <img src={"../img/design.png"} className="img2" alt="" srcset="" />

        <div className="card-box">
          <div className="card2" id="card-box1">
            <div className="cardimg" style={{ width: "18rem" }}>
              <img src={"../img/quality.png"} className="img3" alt="" />
            </div>
            <div className="cardbody">
              <h5 id="different1">Quality Products</h5>
              <p className="content">
                Knowledge base that organized collection system
              </p>
            </div>
          </div>

          <div className="card2">
            <div className="cardimg" style={{ width: "18rem" }}>
              <img src={"../img/delivery.png"} className="img3" alt="" />
            </div>
            <div className="cardbody">
              <h5 id="different">
                Free Delivery
                <span className="new">NEW</span>
              </h5>

              <p className="content">
                Knowledge base that organized collection system
              </p>
            </div>
          </div>

          <div className="card2" id="card-box3">
            <div className="cardimg" style={{ width: "18rem" }}>
              <img src={"../img/return.png"} className="img3" alt="" />
            </div>
            <div className="cardbody">
              <h5 id="different1">Easy Returns</h5>
              <p className="content">
                Knowledge base that organized collection system
              </p>
            </div>
          </div>
        </div>

        <div className="card-box">
          <div className="card2" id="card-box1">
            <div className="cardimg" style={{ width: "18rem" }}>
              <img src={"../img/wide.png"} className="img3" alt="" />
            </div>
            <div className="cardbody">
              <h5 id="different">
                Wide Assortment
                <span className="new">NEW</span>
              </h5>

              <p className="content">
                Knowledge base that organized collection system
              </p>
            </div>
          </div>

          <div className="card2">
            <div className="cardimg" style={{ width: "18rem" }}>
              <img src={"../img/receipe.png"} className="img3" alt="" />
            </div>
            <div className="cardbody">
              <h5 id="different">
                Yummy Receipes
                <span className="new">NEW</span>
              </h5>

              <p className="content">
                Knowledge base that organized collection system
              </p>
            </div>
          </div>

          <div className="card2" id="card-box3">
            <div className="cardimg" style={{ width: "18rem" }}>
              <img src={"../img/discount.png"} className="img3" alt="" />
            </div>
            <div className="cardbody">
              <h5 id="different">
                Daily Deals Discount
                <span className="new">NEW</span>
              </h5>
              <p className="content">
                Knowledge base that organized collection system
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="box">
        <div id="box4">
          <h4 className="heading1">WE HAVE EVERYTHING YOU NEED ?</h4>
          <p className="para">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            magnam accusantium at placeat hic officia nisi veritatis qui
            eligendi, porro alias temporibus omnis! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Voluptatibus deserunt, doloremque
            mollitia, placeat sit praesentium harum aliquid atque dignissimos
          </p>
          <button className="btn2">
            <a href="#"> Contact Us</a>
          </button>
        </div>

        <div id="box5">
          <img
            src={"../img/img2.png"}
            className="img4"
            alt=""
            style={{ height: "400px", width: "500px" }}
          />
        </div>
      </section>

      <section className="try">
        <div className="box3">
          <h2>SOMTHING ABOUT US?</h2>
          <p className="para2">
            Leverage agile frameworks to provide a robust synopsis for high
            level overviews. Iterative to corporate strategy to the table
            win-win survival strategies to ensure
          </p>
        </div>
        <div className="cardbox">
          <div className="card1" style={{ width: "18rem" }}>
            <img
              src={"../img/kiwi.png"}
              className="img"
              alt=""
              style={{ height: "100px", width: "100px" }}
            />
            <div className="card-body">
              <h5>Fresh Vegetables/Fruits</h5>
              <p className="card-text">
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward
              </p>
            </div>
          </div>

          <div className="card1" style={{ width: "18rem" }}>
            <img
              src={"../img/earth.png"}
              className="img"
              alt=""
              style={{ height: "100px", width: "100px" }}
            />
            <div className="card-body">
              <h5>Sustaniable</h5>
              <p className="card-text">
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward
              </p>
            </div>
          </div>

          <div className="card1" style={{ width: "18rem" }}>
            <img
              src={"../img/check.png"}
              className="img"
              alt=""
              style={{ height: "90px", width: "90px" }}
            />
            <div className="card-body">
              <h5>Fully Authorised</h5>
              <p className="card-text">
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward
              </p>
            </div>
          </div>
          <p>To get your profile details: </p><button onClick={getData}>Click me</button>
        {profileData && <div>
              <p>Profile name: {profileData.profile_name}</p>
              <p>About me: {profileData.about_me}</p>
            </div>
        }
        </div>
      </section>
      <Footer />
    </>
  );
};
