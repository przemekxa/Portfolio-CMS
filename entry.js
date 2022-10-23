const path = require("path");

let serverLocation = path.resolve(__dirname, "build-server", "server.js");

require(serverLocation);
