const express = require("express");
const auth = require("../auth");
const userController = require("../controllers/users");
const router = express.Router();

// Check if email exists
router.post("/checkemail", (req, res) => {
    userController.checkEmailExists(req.body.email).then(result => res.status(result.statusCode).send(result.response));
});

// Check if username exists
router.post("/checkusername", (req, res) => userController.checkUsernameExists(req.body.username).then(result => res.status(result.statusCode).send(result.response)));

// Register a user
router.post("/register", (req, res) => userController.registerUser(req.body).then(result => res.status(result.statusCode).send(result.response)));

// Login user
router.post("/login", (req, res) => userController.loginUser(req.body).then(result => res.status(result.statusCode).send(result.response)));

// Change password
router.post("/change-password", auth.verify, (req, res) => {
    const sessionData = auth.decode(req.headers.authorization);
    userController.changePassword(sessionData, req.body).then(result => res.status(result.statusCode).send(result.response));
});

router.patch("/make-admin", auth.verify, (req, res) => {
    const sessionData = auth.decode(req.headers.authorization);
    userController.makeUserAsAdmin(sessionData, req.body).then(result => res.status(result.statusCode).send(result.response));
});

module.exports = router;