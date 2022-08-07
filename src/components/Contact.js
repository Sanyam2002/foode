import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import SweetAlertContext from "./context/SweetAlertContext";
import Spinner from "./Spinner";

export const Contact = (props) => {
  const { contactalert, toggle, addminus } = useContext(SweetAlertContext);
  const [contacts, setcontacts] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setloading] = useState(false);

  useEffect(() => {
    addminus();
  });

  
  useEffect(() => {
    toggle();
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);
  const onChange = (e) => {
    setcontacts({ ...contacts, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = contacts;
    const response = await fetch(
      `http://localhost:5000/api/profile/addcontact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ name, email, message }),
      }
    );
    const contact = await response.json();
    setcontacts(contact);
    if (contact.success) {
      contactalert();
      setcontacts({ name: "", email: "", message: "" });
    }
  };
  return (
    <>
      {loading && <Spinner />}
      <Navbar />
      <div id="map-bg" className="mt-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241202.51557892113!2d72.85920278020322!3d19.16069788539421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1631038132857!5m2!1sen!2sin"
          style={{ border: 0, width: "1519px", height: "400px" }}
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
      <section className="contact-area pt-60 pb-80">
        <div className="container">
          <div className="container-inner-wrap">
            <div className="row justify-content-center justify-content-lg-between">
              <div className="col-lg-6 col-md-8 order-2 order-lg-0">
                <div className="contact-title mb-25">
                  <h5 className="sub-title">Contact Us</h5>
                  <h2 className="title">
                    Let's Talk Question<span>.</span>
                  </h2>
                </div>
                <div className="contact-wrap-content">
                  <p>
                    Making for software espially of the relating espeially of
                    the face costa when unknown galley of type and scrambled.
                  </p>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-grp">
                      <label htmlFor="name">
                        Your Name <span>*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={contacts.name}
                        placeholder="ABC DEF..."
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-grp">
                      <label htmlFor="email">
                        Your Email <span>*</span>
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={contacts.email}
                        placeholder="abc123@gmail.com"
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-grp">
                      <label htmlFor="message">
                        Your Message <span>*</span>
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        value={contacts.message}
                        placeholder="Opinion..."
                        onChange={onChange}
                      ></textarea>
                    </div>
                    <div className="form-grp checkbox-grp">
                      <input type="checkbox" id="checkbox" />
                      <label htmlFor="checkbox">
                        Don’t show your email address
                      </label>
                    </div>
                    <button
                      type="button"
                      className="btn rounded-btn"
                      onClick={handleSubmit}
                    >
                      Send Now
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-8">
                <div className="contact-info-wrap">
                  <div className="contact-img">
                    <img src={"../img/contact_img.png"} alt="" />
                  </div>
                  <div className="contact-info-list">
                    <ul>
                      <li>
                        <div className="icon">
                          <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div className=" con">
                          <p>M84 New Park , Mumbai, Maharashtra</p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fas fa-phone-alt"></i>
                        </div>
                        <div className=" con">
                          <p>+91 9254429568</p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fas fa-envelope-open"></i>
                        </div>
                        <div className=" con">
                          <p>+91 9254429568</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="contact-social">
                    <ul>
                      <li>
                        <Link to="/">
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fab fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fab fa-linkedin-in"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
