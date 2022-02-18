const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");
const companyRoutes = require("./routes/companies");
const jobRoutes = require("./routes/jobs");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// Test route
app.get("/", (req, res) => res.send("Job App: My app that I've created because I'm bored."));
app.use("/api/users", userRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));