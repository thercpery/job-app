const express = require("express");
const auth = require("../auth");
const companyController = require("../controllers/companies");
const router = express.Router();

// View all companies
router.get("/", (req, res) => {});

module.exports = router;