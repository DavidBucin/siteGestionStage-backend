const express = require("express");
const authControllers = require("../controllers/auth-controllers");
const router = express.Router();

router.post('/checkAccount', authControllers.checkAccount);

module.exports = router;
