import axios from "axios";
import profileContext from "./context/profilecontext";
import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Navbar } from "./Navbar";
import Spinner from "./Spinner";
import SweetAlertContext from "./context/SweetAlertContext";
const State = [
  { key: 1, value: "Andhra Pradesh" },
  { key: 2, value: "Arunachal Pradesh" },
  { key: 3, value: "Assam" },
  { key: 4, value: "Bihar" },
  { key: 5, value: "Chhattisgarh" },
  { key: 6, value: "Goa" },
  { key: 7, value: "Gujarat" },
  { key: 8, value: "Haryana" },
  { key: 9, value: "Himachal Pradesh" },
  { key: 10, value: "Jammu and Kashmir" },
  { key: 11, value: "Jharkhand" },
  { key: 12, value: "Karnataka" },
  { key: 13, value: "Kerala" },
  { key: 14, value: "Madhya Pradesh" },
  { key: 15, value: "Maharashtra" },
  { key: 16, value: "Manipur" },
  { key: 17, value: "Meghalaya" },
  { key: 18, value: "Mizoram" },
  { key: 19, value: "Nagaland" },
  { key: 20, value: "Odisha" },
  { key: 21, value: "Punjab" },
  { key: 22, value: "Rajasthan" },
  { key: 23, value: "Sikkim" },
  { key: 24, value: "Tamil Nadu" },
  { key: 25, value: "Telangana" },
  { key: 26, value: "Tripura" },
  { key: 27, value: "Uttar Pradesh" },
  { key: 28, value: "Uttarakhand" },
  { key: 29, value: "West Bengal" },
];
const Country = [
  { key: 1, value: "India" },
  { key: 2, value: "UAE" },
];
export const Profile = (props) => {
  let history = useHistory();
  const [loading, setloading] = useState(false)
  const { Address, toggle, addminus } = useContext(SweetAlertContext);

  useEffect(() => {
    addminus();
  });
  
  useEffect(() => {
    toggle();
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 1000);
  }, []);

  const { addProfile } = useContext(profileContext);

  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    addProfile(
      profile.firstname,
      profile.lastname,
      profile.address,
      profile.city,
      profile.state,
      profile.pincode,
      profile.country,
      profile.phone
    );
    setProfile({
      firstname: "",
      lastname: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      phone: "",
    });
    history.push("/profilelanding");
    Address();
  };
  
  const onChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  return (
    <>
    {loading && <Spinner/>}
      <Navbar />
      <form className="ftco-section" onSubmit={onSubmit}>
        <div className="containerr">
          <section id="main">
            <header class="page-header mb-30">
              <h1> New address</h1>
            </header>
          </section>
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap ">
                <div className="p-4 p-lg-5">
                  <form className="signin-form">
                    <div className="form-group mb-3 d-flex flex-row align-items-center">
                      <label class="col-md-2 form-control-label d-flex justify-content-center">
                        First Name
                      </label>
                      <div class="col-md-10">
                        <input
                          class="form-control"
                          name="firstname"
                          type="text"
                          value={profile.firstname}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="form-group mb-3 d-flex flex-row align-items-center">
                      <label class="col-md-2 form-control-label d-flex justify-content-center">
                        Last Name
                      </label>
                      <div class="col-md-10">
                        <input
                          class="form-control"
                          name="lastname"
                          type="text"
                          value={profile.lastname}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="form-group mb-3 d-flex flex-row align-items-center">
                      <label class="col-md-2 form-control-label d-flex justify-content-center">
                        Address
                      </label>
                      <div class="col-md-10">
                        <input
                          class="form-control"
                          name="address"
                          type="text"
                          value={profile.address}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="form-group mb-3 d-flex flex-row align-items-center">
                      <label class="col-md-2 form-control-label d-flex justify-content-center">
                        City
                      </label>
                      <div class="col-md-10">
                        <input
                          class="form-control"
                          name="city"
                          type="text"
                          value={profile.city}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="form-group mb-3 d-flex flex-row align-items-center">
                      <label class="col-md-2 form-control-label d-flex justify-content-center">
                        State
                      </label>
                      <div class="col-md-10">
                        <input
                          class="form-control"
                          name="state"
                          type="text"
                          value={profile.state}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="form-group mb-3 d-flex flex-row align-items-center">
                      <label class="col-md-2 form-control-label d-flex justify-content-center">
                        Pin Code
                      </label>
                      <div class="col-md-10">
                        <input
                          class="form-control"
                          name="pincode"
                          type="number"
                          value={profile.pincode}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="form-group mb-3 d-flex flex-row align-items-center">
                      <label class="col-md-2 form-control-label d-flex justify-content-center">
                        Country
                      </label>
                      <div class="col-md-10">
                        <input
                          class="form-control"
                          name="country"
                          type="text"
                          value={profile.country}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="form-group mb-3 d-flex flex-row align-items-center">
                      <label class="col-md-2 form-control-label d-flex justify-content-center">
                        Phone
                      </label>
                      <div class="col-md-10">
                        <input
                          class="form-control"
                          name="phone"
                          type="number"
                          value={profile.phone}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn btn-primary submit px-3"
                        style={{ width: "20%" }}
                        onClick={onSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
