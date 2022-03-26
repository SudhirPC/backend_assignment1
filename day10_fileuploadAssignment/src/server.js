const app = require("./index");

const connect = require("./config/db");

app.listen(3750, async (req, res) => {
  try {
    await connect();

    console.log("listening to the port  3750");
  } catch (error) {
    console.log(error.message);
  }
});