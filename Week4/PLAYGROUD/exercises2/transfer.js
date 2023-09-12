const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Account = require("./accountModel");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.error("MongoDB connection error:", err));
db.once("open", () => {
  console.log("MongoDB connected");
});

// POST route for transferring money
app.post("/transfer", async (req, res) => {
  const { fromAccount, toAccount, amount, remark } = req.body;

  try {
    // Find the source and destination accounts
    const sourceAccount = await Account.findOne({
      account_number: fromAccount,
    });
    const destinationAccount = await Account.findOne({
      account_number: toAccount,
    });

    if (!sourceAccount || !destinationAccount) {
      throw new Error("Account not found");
    }

    // Check if the source account has sufficient balance
    if (sourceAccount.balance < amount) {
      throw new Error("Insufficient balance");
    }

    // Calculate new balances
    const newSourceBalance = sourceAccount.balance - amount;
    const newDestinationBalance = destinationAccount.balance + amount;

    // Increment change numbers for both accounts
    const sourceChangeNumber = sourceAccount.account_changes.length + 1;
    const destinationChangeNumber =
      destinationAccount.account_changes.length + 1;

    // Create change objects for both accounts
    const sourceChange = {
      change_number: sourceChangeNumber,
      amount: -amount,
      changed_date: new Date(),
      remark: `Transfer to account ${toAccount}: ${remark}`,
    };

    const destinationChange = {
      change_number: destinationChangeNumber,
      amount: amount,
      changed_date: new Date(),
      remark: `Transfer from account ${fromAccount}: ${remark}`,
    };

    // Update balances and add changes to both accounts
    sourceAccount.balance = newSourceBalance;
    destinationAccount.balance = newDestinationBalance;
    sourceAccount.account_changes.push(sourceChange);
    destinationAccount.account_changes.push(destinationChange);

    // Save the changes to the database
    await sourceAccount.save();
    await destinationAccount.save();

    // Return the updated accounts
    res.json([sourceAccount, destinationAccount]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
