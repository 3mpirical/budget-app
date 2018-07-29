const axios = require("axios");


axios.delete("/expense/55223611806218580")
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
