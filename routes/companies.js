const express = require("express");
const auth = require("../auth");
const companyController = require("../controllers/companies");
const router = express.Router();

// View all companies
router.get("/", (req, res) => companyController.viewAllCompanies().then(result => res.status(result.statusCode).send(result.response)));

// Add a company
router.post("/", (req, res) => {
    const sessionData = auth.decode(req.headers.authorization);
    companyController.addCompany(sessionData, req.body).then(result => res.status(result.statusCode).send(result.response));
});

// View company by ID
router.get("/:id", (req, res) => companyController.viewCompanyByID(req.params.id).then(result => res.status(result.statusCode).send(result.response)));

module.exports = router;