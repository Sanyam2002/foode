const express = require('express');
const router = express.Router()
const fetchUser = require('../middleware/fetchUser');
const Profile = require('../models/ProfileModel')
const Contact = require('../models/ContactModel')
const { body, validationResult } = require('express-validator');

// Route 1: Get all the notes : GET "/api/profile/fetchallprofile". Login required
router.get('/fetchallprofiles', fetchUser, async (req, res) => {
    try {
        const profiles = await Profile.find({ user: req.user.id })
        res.json(profiles)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }

})

//Route 2: Add notes : GET "/api/profile/addaddress". Login required
router.post('/addaddress', fetchUser, [
    body('firstname', 'Enter a Valid First Name'),
    body('lastname', 'Enter a Valid Last Name'),
    body('address', 'Enter a Valid address'),
    body('city', 'Enter a Valid city'),
    body('state', 'Enter a Valid state'),
    body('pincode', 'Enter a Valid pincode').isLength({ min: 6 }),
    body('country', 'Enter a Valid country'),
    body('phone', 'Enter a Valid phone').isLength({ min: 10 }),
], async (req, res) => {

    try {
        const {firstname,lastname,address,city,state,pincode,country,phone} = req.body

        //If there are errors, return Bad request and the errors 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const profile = new Profile({
            firstname, lastname, address,city,state,pincode,country,phone, user: req.user.id
        })
        const savedProfile = await profile.save()

        res.json({savedProfile})
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
})

//Route 3: Update an existing Profile : PUT "/api/profile/updateprofile". Login required
router.put('/updateprofile/:id', fetchUser, async (req, res) => {
    try {
        const {firstname , lastname,address,city,state,pincode,country,phone  } = req.body

        //Create a newNote Object
        const newProfile = {};
        if (firstname) { newProfile.firstname = firstname }
        if (lastname) { newProfile.lastname = lastname }
        if (address) { newProfile.address = address }
        if (city) { newProfile.city = city }
        if (state) { newProfile.state = state }
        if (pincode) { newProfile.pincode = pincode }
        if (country) { newProfile.country = country }
        if (phone) { newProfile.phone = phone }

        //Find the note to be updated and update it
        let profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).send("Not Found")
        }
        if (profile.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        profile = await Profile.findByIdAndUpdate(req.params.id, { $set: newProfile }, { new: true })
        res.json({ profile });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }

})

//Route 4: Delete an existing profile : Delete "/api/profile/deleteprofile". Login required
router.delete('/deleteprofile/:id', fetchUser, async (req, res) => {
    try {
         //Find the note to be deleted and delete it
        let profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).send("Not Found")
        }
        if (profile.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        profile = await Profile.findByIdAndDelete(req.params.id)
        res.json({ "Success":"Note Has been Deleted", profile:profile });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }

})

router.post('/addcontact', fetchUser, [
    body('name', 'Enter a Valid First Name'),
    body('email', 'Enter a Valid Email').isEmail(),
    body('message', 'Enter a Valid message')
], async (req, res) => {

    try {
        let success = false
        const {name, email,message} = req.body
        //If there are errors, return Bad request and the errors 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const contact = new Contact({
            name, email,message, user: req.user.id
        })
        const savedContact = await contact.save()
        success = true;
        res.json({success,savedContact})
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
})


module.exports = router