const express = require("express");

const {
    createResource,
    getResources,
    getResourceById,
    updateResource,
    deleteResource
} = require("../controllers/resourceController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createResource);
router.get("/", getResources);
router.get("/:id", getResourceById);
router.put("/:id", protect, updateResource);
router.delete("/:id", protect, deleteResource);

module.exports = router;