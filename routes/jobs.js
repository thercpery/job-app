const express = require("express");
const auth = require("../auth");
const jobController = require("../controllers/jobs");
const router = express.Router();

// View all jobs
router.get("/", (req, res) => jobController.viewAllJobs().then(result => res.status(result.statusCode).send(result.response)));

// View job by ID
router.get("/:id", (req, res) => jobController.viewJobById(req.params.id).then(result => res.status(result.statusCode).send(result.response)));

module.exports = router;