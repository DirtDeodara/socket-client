const ENDPOINT = process.env.ENDPOINT || "localhost:5000";

const io = require("socket.io-client");
export const socket = io(ENDPOINT, {
  extraHeaders: {
    "Access-Control-Allow-Credential": true,
  },
});
