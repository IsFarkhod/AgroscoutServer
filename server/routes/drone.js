const express = require('express')
const drugController = require('../controllers/drugController')
const droneController = require('../controllers/droneController')
const router = express.Router()
router.get("/home", droneController.home)
router.get("/drones", droneController.allview)
router.post("/busket", droneController.addItemToBusket)
router.get("/admin", droneController.view)
router.post("/admin", droneController.find)
router.get("/add-drone", droneController.form)
router.post("/add-drone", droneController.create)
router.get("/drug", drugController.allViewDrug)
router.get("/edit-drone/:id", droneController.edit)
router.post("/edit-drone/:id", droneController.update)
router.get("/delete-drone/:id", droneController.deleteDrone)
module.exports = router;