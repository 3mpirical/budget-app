const axios = require("axios");

axios.get("/income")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
