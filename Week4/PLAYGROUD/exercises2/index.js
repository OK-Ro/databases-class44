const setupSampleData = require("./setup");
const transfer = require("./transfer");

async function main() {
  try {
    // Step 1: Set up sample data
    await setupSampleData();
    console.log("Sample data set up successfully.");

    // Step 2: Test the transfer function
    const [sourceAccount, destinationAccount] = await transfer(
      101, // fromAccount
      102, // toAccount
      1000, // amount
      "Payment for goods" // remark
    );

    console.log(`Transfer successful.`);
    console.log(`Source Account: ${JSON.stringify(sourceAccount, null, 2)}`);
    console.log(
      `Destination Account: ${JSON.stringify(destinationAccount, null, 2)}`
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
