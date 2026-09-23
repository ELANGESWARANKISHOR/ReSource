const express = require("express");

const {
    createResource,
    getResources,
    getResourceById,
    updateResource,
    deleteResource,
    getMyResources
} = require("../controllers/resourceController");

const protect = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, requireRole("provider"), createResource);

router.get("/", getResources);

router.get("/my", protect, requireRole("provider"), getMyResources);

router.get("/:id", getResourceById);

router.put("/:id", protect, requireRole("provider"), updateResource);

router.delete("/:id", protect, requireRole("provider"), deleteResource);

module.exports = router;