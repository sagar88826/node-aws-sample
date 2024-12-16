const http = require("http");
const url = require("url");

const { users } = require("./users");

const requestListener = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(users));
    res.end();
  } else if (parsedUrl.pathname === "/user") {
    const { id } = parsedUrl.query;
    if (!id) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ error: "User Id not provided" }));
      res.end();
    }
    const user = users.find(({ _id }) => id === _id);
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ error: "Could not find requested resource" }));
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(user));
      res.end();
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "Could not find requested resource" }));
    res.end();
  }
};
const server = http.createServer(requestListener);
server.listen(8000);
console.log("Application running on Port 8000");
