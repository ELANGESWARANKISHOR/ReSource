const express = require("express");

const {
    createRequest,
    getMyRequests,
    getProviderRequests,
    acceptRequest,
    rejectRequest,
    cancelRequest,
} = require("../controllers/requestController");

const protect = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, requireRole("recipient"), createRequest);
router.get("/my", protect, requireRole("recipient"), getMyRequests);
router.get("/provider", protect, requireRole("provider"), getProviderRequests);
router.put("/:id/accept", protect, requireRole("provider"), acceptRequest);
router.put("/:id/reject", protect, requireRole("provider"), rejectRequest);
router.put("/:id/cancel", protect, requireRole("recipient"), cancelRequest);

module.exports = router;