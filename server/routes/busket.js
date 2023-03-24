const express = require("express")
const busketController = require("../controllers/busketController")
const router = express.Router()

router.get("/busket", busketController.addItem)
//router.post("/busket", busketController.addItemToBusket)
router.get("/:id", busketController.itemDelete)
module.exports = router