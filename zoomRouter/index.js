const express = require("express");
const router = express.Router();
const requestPromise = require("request-promise");
const jwt = require("jsonwebtoken");


const payload = {
  iss: process.env.API_KEY, //your API KEY
  exp: new Date().getTime() + 5000,

};
const token = jwt.sign(payload, process.env.API_SECRET); //your API SECRET HERE

router.get("/createMeeting", (req, res) => {
  email = process.env.ZOOM_EMAIL; // your zoom developer email account
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: "Zoom Meeting Using Node JS", //meeting title
      type: 2,
      settings: {
        host_video: "true",
        participant_video: "true",
      },
    },
    auth: {
      bearer: token,
    },headers: {
        "User-Agent": "Zoom-api-Jwt-Request",
        "content-type": "application/json",
      },
      json: true, 
    };
  
    requestPromise(options)
      .then(function (response) {
        res.json(response);
      })
      .catch(function (err) {
        // API call failed...
        res.json(err.message);
        console.log("API call failed, reason ", err.message);
      });
  });
  
  module.exports = router;