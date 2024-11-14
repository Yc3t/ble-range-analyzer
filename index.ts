import app from "./app"
Bun.serve({
  port: 3000, // defaults to $BUN_PORT, $PORT, $NODE_PORT otherwise 3000
  fetch:app.fetch
});

console.log("hi")