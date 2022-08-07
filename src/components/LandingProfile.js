import React, { useContext, useEffect, useRef, useState } from "react";
import profileContext from "./context/profilecontext";
import SweetAlertContext from "./context/SweetAlertContext";
import { Navbar } from "./Navbar";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { ProfileCard } from "./ProfileCard";

export const LandingProfile = (props) => {
  const context = useContext(profileContext);
  const { update, toggle, addminus } = useContext(SweetAlertContext);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    addminus();
  });

  let history = useHistory();
  const { profiles, getProfiles, editProfile } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getProfiles();
    } else {
      history.push("/login");
    }
    toggle();
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);
  const [profilee, setprofilee] = useState({
    id: "",
    efirstname: "",
    elastname: "",
    eaddress: "",
    ecity: "",
    estate: "",
    epincode: "",
    ecountry: "",
    ephone: "",
  });
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateProfile = (currentProfile) => {
    ref.current.click();
    setprofilee({
      id: currentProfile._id,
      efirstname: currentProfile.firstname,
      elastname: currentProfile.lastname,
      eaddress: currentProfile.address,
      ecity: currentProfile.city,
      estate: currentProfile.state,
      epincode: currentProfile.pincode,
      ecountry: currentProfile.country,
      ephone: currentProfile.phone,
    });
  };
  const handleClick = (e) => {
    editProfile(
      profilee.id,
      profilee.efirstname,
      profilee.elastname,
      profilee.eaddress,
      profilee.ecity,
      profilee.estate,
      profilee.epincode,
      profilee.ecountry,
      profilee.ephone
    );
    update();
    refClose.current.click();
  };
  const onChange = (e) => {
    setprofilee({ ...profilee, [e.target.name]: e.target.value });
  };
  return (
    <>
      {loading && <Spinner />}

      <Navbar />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="firstname" className="form-label">
                    Fisrt Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="efirstname"
                    value={profilee.efirstname}
                    required
                    name="efirstname"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastname" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="elastname"
                    value={profilee.elastname}
                    required
                    name="elastname"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eaddress"
                    name="eaddress"
                    value={profilee.eaddress}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ecity"
                    name="ecity"
                    value={profilee.ecity}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="estate"
                    name="estate"
                    value={profilee.estate}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pincode" className="form-label">
                    Pincode
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="epincode"
                    name="epincode"
                    value={profilee.epincode}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ecountry"
                    name="ecountry"
                    value={profilee.ecountry}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ephone"
                    name="ephone"
                    value={profilee.ephone}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="container">
          {profiles.length === 0 && (
            <div className="form-group d-md-flex justify-content-start mt-3 flex-direction-row">
              <div>
                <h4>Please add Address</h4>
              </div>

              <div className="w-70 text ">
                <Link to="/profile">
                  <i className="fas fa-plus px-2"></i>Create a new address
                </Link>
                <br />
              </div>
            </div>
          )}
        </div>
        {profiles.length > 0 && (
          <section className="ftco-section">
            <div className="container">
              <section id="main">
                <header className="page-header mb-30">
                  <h1> Your address</h1>
                </header>
              </section>
              <div className="d-flex">
                {profiles.map((profile) => {
                  return (
                    <ProfileCard
                      key={profile._id}
                      updateProfile={updateProfile}
                      profile={profile}
                    />
                  )
                })}
              </div>
              <div className="form-group d-md-flex justify-content-start mt-3">
                <div className="w-70 text ">
                  <Link to="/profile">
                    <i className="fas fa-plus px-2"></i>Create a new address
                  </Link>
                  <br />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}