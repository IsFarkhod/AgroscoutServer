const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router()

router.get("/register", userController.page)
router.post("/register", userController.correctSignUp)
router.post("/admin", userController.logIn)
module.exports = router