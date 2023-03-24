const express = require("express")
const drugController = require("../controllers/drugController")
const router = express.Router()

router.get("/drug", drugController.allViewDrug)
router.get("/view-drug", drugController.drugAdmin)
router.post("/view-drug", drugController.findDrug)
router.get("/add-drug", drugController.formDrug)
router.post("/add-drug", drugController.addDrug)
router.get("/edit-drug/:id", drugController.editDrug)
router.post("/edit-drug/:id", drugController.updateDrug)
router.get("/:id", drugController.deleteDrug)
/*router.post("/admin", drugController.findDrug)*/

module.exports = router;