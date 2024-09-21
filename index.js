const express = require("express"); // Use require
const { execFile } = require("child_process");
const cors = require("cors"); // Change to require
const path = require("path"); // Import path for handling file paths

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// Handle LRU Algorithm

app.use("/", require("./routes/index"));
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
