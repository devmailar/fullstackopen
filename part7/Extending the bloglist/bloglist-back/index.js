const app = require("./app");
const config = require("./utils/config");

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(config.PORT, () => {
  console.info(`Server running on port ${config.PORT}`);
});
