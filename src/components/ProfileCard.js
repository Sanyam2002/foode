import React, { useContext } from "react";
import profileContext from "./context/profilecontext";
import SweetAlertContext from "./context/SweetAlertContext";
export const ProfileCard = (props) => {
  const  {Delete,update}  = useContext(SweetAlertContext);
  const { deleteprofile } = useContext(profileContext);
  const { profile, updateProfile } = props;
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-6 mx-2">
        <article id="address-18" className="addresss" data-id-address="18">
          <div className="address-body">
            <h4>My Address</h4>
            <div>
              {profile.firstname} {profile.lastname}
              <br />
              {profile.address}
              <br />
              {profile.city},{profile.state} {profile.pincode}
              <br />
              {profile.country}
            </div>
          </div>
          <div className="address-footer">
            <div>
              <i
                className="fas fa-edit mx-2"
                data-link-action="delete-address"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  updateProfile(profile);
                }}
              ></i>
              <i
                className="fas fa-trash-alt mx-2"
                data-link-action="edit-address"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  deleteprofile(profile._id);
                  Delete();
                }}
              ></i>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};
