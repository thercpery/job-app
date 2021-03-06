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

// Search users
router.get("/search", (req, res) => {
    const sessionData = auth.decode(req.headers.authorization);
    userController.searchUser(req.body, sessionData).then(result => res.status(result.statusCode).send(result.response));
});

// Follow users
router.patch("/follow/:id", auth.verify, (req, res) => {
    const sessionData = auth.decode(req.headers.authorization);
    userController.followUser(sessionData, req.params.id).then(result => res.status(result.statusCode).send(result.response));
});

// Approve follow request for private users
router.patch("/follow/approve/:id", auth.verify, (req, res) => {
    const sessionData = auth.decode(req.headers.authorization);
    userController.approveFollowRequest(sessionData, req.params.id).then(result => res.status(result.statusCode).send(result.response));
});

// Deny follow request for private users
router.delete("/follow/deny/:id", auth.verify, (req, res) => {
    const sessionData = auth.decode(req.headers.authorization);
    userController.denyFollowRequest(sessionData, req.params.id).then(result => res.status(result.statusCode).send(result.response));
});

// Make user public/private
router.patch("/changevisibility", auth.verify, (req, res) => {
    const sessionData = auth.decode(req.headers.authorization);
    userController.changeProfileVisibility(sessionData).then(result => res.status(result.statusCode).send(result.response));
});

// View profile of user
router.get("/:username", (req, res) => {
    const sessionData = auth.decode(req.headers.authorization);
    userController.viewProfile(sessionData, req.params.username).then(result => res.status(result.statusCode).send(result.response));
});

// Change password
router.post("/change-password", auth.verify, (req, res) => {
    const sessionData = auth.decode(req.headers.authorization);
    userController.changePassword(sessionData, req.body).then(result => res.status(result.statusCode).send(result.response));
});

// Make user an admin
router.patch("/make-admin", auth.verify, (req, res) => {
    const sessionData = auth.decode(req.headers.authorization);
    userController.makeUserAsAdmin(sessionData, req.body).then(result => res.status(result.statusCode).send(result.response));
});

// Change user details
router.put("/", auth.verify, (req, res) => {
    const sessionData = auth.decode(req.headers.authorization);
    userController.changeUserDetails(sessionData, req.body).then(result => res.status(result.statusCode).send(result.response));
});

module.exports = router;