const { createClient } = require("redis");

const client = createClient({ url: "redis://localhost:6379" });


client.on("error", function (error) {

  console.log(error.message);
});

module.exports = client;

