const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// Test route
app.get("/", (req, res) => res.send("Job App: My app that I've created because I'm bored."));

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));