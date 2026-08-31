
import express from "express";
import dotenv from "dotenv"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4500

app.get("/", (req, res) => {
  res.send("All good from Ec2 server");
});
app.get("/deploy", (req, res) => {
  res.send("Hello Vishal From EC2 server!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
}); 