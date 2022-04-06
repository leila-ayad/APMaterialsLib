const server = require("./server");
const { PORT } = require("./config");
require("dotenv").config();

server.listen(PORT, () => {
  console.log(`\n** Running on port ${PORT} **\n`);
});
