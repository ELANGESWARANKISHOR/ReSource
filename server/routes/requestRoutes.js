const express = require("express");

const {
    createRequest,
    getMyRequests,
    getProviderRequests,
    acceptRequest,
    rejectRequest
} = require("../controllers/requestController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createRequest);
router.get("/my", protect, getMyRequests);
router.get("/provider", protect, getProviderRequests);
router.put("/:id/accept", protect, acceptRequest);
router.put("/:id/reject", protect, rejectRequest);

module.exports = router;