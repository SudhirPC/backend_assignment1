const app = require("./index");

const connect = require("./config/db");

app.listen(3700, async (req, res) => {
  try {
    await connect();

    console.log("listening to the port  3700");
  } catch (error) {
    console.log(error.message);
  }
});