const axios = require("axios");

const transferData = {
  fromAccount: 101, // Replace other
  toAccount: 102, // Replace other
  amount: 1000, // Replace other
  remark: "Test Transfer", // Provide a remark for the transfer
};

axios
  .post("http://localhost:3000/transfer", transferData)
  .then((response) => {
    console.log("Transfer Successful");
    console.log("Updated Accounts:", response.data);
  })
  .catch((error) => {
    console.error("Transfer Failed");
    console.error("Error:", error.response.data);
  });
