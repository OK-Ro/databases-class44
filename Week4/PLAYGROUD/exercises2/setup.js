const mongoose = require("mongoose");
const Account = require("./accountModel");

async function setupSampleData() {
  try {
    // Connect to the MongoDB database using the connection URI from the .env file
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clean up the existing accounts
    await Account.deleteMany({});

    // Sample data
    const sampleData = [
      {
        account_number: 101,
        balance: 5000,
        account_changes: [
          {
            change_number: 1,
            amount: 5000,
            changed_date: new Date("2023-09-01"),
            remark: "Initial deposit",
          },
        ],
      },
      {
        account_number: 102,
        balance: 3000,
        account_changes: [
          {
            change_number: 1,
            amount: 3000,
            changed_date: new Date("2023-09-01"),
            remark: "Initial deposit",
          },
        ],
      },
      {
        account_number: 103,
        balance: 7000,
        account_changes: [
          {
            change_number: 1,
            amount: 7000,
            changed_date: new Date("2023-09-01"),
            remark: "Initial deposit",
          },
        ],
      },
      {
        account_number: 104,
        balance: 1500,
        account_changes: [
          {
            change_number: 1,
            amount: 1500,
            changed_date: new Date("2023-09-01"),
            remark: "Initial deposit",
          },
        ],
      },
      {
        account_number: 105,
        balance: 10000,
        account_changes: [
          {
            change_number: 1,
            amount: 10000,
            changed_date: new Date("2023-09-01"),
            remark: "Initial deposit",
          },
        ],
      },
    ];

  
    await Account.insertMany(sampleData);

    await mongoose.disconnect();
  } catch (error) {
    throw error;
  }
}

module.exports = setupSampleData;
