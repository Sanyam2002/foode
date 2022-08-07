import profileContext from './profilecontext'
import { useState } from 'react'
const ProfileState = (props) => {
    const host = "http://localhost:5000"
    const profileinitial = []
    const [profiles, setProfiles] = useState(profileinitial)
    const [credentials, setCredentials] = useState([]);

    const getProfiles = async () => {
        //api calls
        const response = await fetch(`${host}/api/profile/fetchallprofiles`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        setProfiles(json)
    };

    //addProfile
    const addProfile = async (firstname,lastname,address,city,state,pincode,country,phone) => {
        const response = await fetch(`${host}/api/profile/addaddress`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({firstname,lastname,address,city,state,pincode,country,phone}),
        });

        const profile = await response.json()
        setProfiles(profiles.concat(profile));
    };
     //editProfile
     const editProfile = async (id ,firstname , lastname,address,city,state,pincode,country,phone  ) => {
        const response = await fetch(`${host}/api/profile/updateprofile/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({firstname,lastname,address,city,state,pincode,country,phone}),
        });

        let newprofiles = JSON.parse(JSON.stringify(profiles))
        //logic to edit
        for (let index = 0; index < newprofiles.length; index++) {
            const element = newprofiles[index];
            if (element._id === id) {
                newprofiles[index].firstname = firstname;
                newprofiles[index].lastname = lastname;
                newprofiles[index].address = address;
                newprofiles[index].city = city;
                newprofiles[index].state = state;
                newprofiles[index].pincode = pincode;
                newprofiles[index].country = country;
                newprofiles[index].phone = phone;
                break;
            }
        };
        setProfiles(newprofiles)   ;
    };


    //Delete Profile
    const deleteprofile = async (id) => {
        //api call
        const response = await fetch(`${host}/api/profile/deleteprofile/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = response.json();
        console.log(json)


        console.log("deleting profile with id" + id);
        const newprofiles = profiles.filter((profile) => {
            return profile._id !== id;
        });
        setProfiles(newprofiles);
    };
    
    const getAccountDetails = async () => {
        const url = "http://localhost:5000/api/auth/getuser";
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });
        const json = await response.json()
        console.log(json)
        setCredentials(json);
      }
   
    return (    
        <profileContext.Provider value={{ getAccountDetails,profiles, addProfile,getProfiles,editProfile,deleteprofile,credentials} }>
            {props.children};
        </profileContext.Provider>
    )
}

export default ProfileState;
