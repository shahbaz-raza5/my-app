const express = require("express");
const cors = require("cors");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const bodyparser = require("body-parser");
const CLIENT_ID = "c2d66ead40d612da05cf";
const CLIENT_SECRET = "d55e03d5786af2ae409aaa7849505c56e2273881";

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.get("/getAccessToken", async function (req, resp) {
  console.log('Code',req.query.code);
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;
  await fetch("https://github.com/login/oauth/access_token" + params, {
    methods: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data in server", data);
      resp.json(data);
    });
});

app.get("/getUserData", async function (req, resp) {
  req.get("Authorization");
  console.log("Request", req);
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data", data);
      resp.json(data);
    });
});



app.get("/getUserGists", async function (req, resp) {
  req.get("Authorization");

  await fetch(`https://api.github.com/user/gists`, {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
      Accept: "application/vnd.github+json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data", data);
      resp.json(data);
    });
});

app.listen(4000, () => {
  console.log("CORS SERVER RUNNING");
});
