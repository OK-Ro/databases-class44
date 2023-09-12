const mongoose = require("mongoose");

// schema for the "accounts" collection
const accountSchema = new mongoose.Schema({
  account_number: Number,
  balance: Number,
  account_changes: [
    {
      change_number: Number,
      amount: Number,
      changed_date: Date,
      remark: String,
    },
  ],
});

//"accounts" collection
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
