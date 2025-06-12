const express = require("express");
const router = express.Router();
const TeamController = require("../controller/TeamController");

router.post("/", TeamController.createTeamMember);
router.get("/", TeamController.getllTeamMembers);
router.get("/single", TeamController.getTeamMemberById);
router.put("/", TeamController.updateTeamMember);
router.delete("/", TeamController.deleteTeamMember);
module.exports = router;
