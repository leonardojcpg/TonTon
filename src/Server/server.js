const express = require("express");
const router = require("./Routes/routes");

const app = express();
const PORT = process.env.PORT || 3001

app.use(router);

// api routes
app.get("/users", (req, res) => {
  res.json({ message: "API funcionando!" })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
