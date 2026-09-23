const ResourceRequest = require("../models/ResourceRequest");
const Resource = require("../models/Resource");

const createRequest = async (req, res) => {
    try {
        const { resourceId, quantity, message } = req.body;

        if (!resourceId || !quantity) {
            return res.status(400).json({
                message: "Resource ID and quantity are required"
            });
        }

        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({
                message: "Quantity must be a positive integer"
            });
        }
        
        // Find resource
        const resource = await Resource.findById(resourceId);

        if (!resource) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        if (
            resource.availableUntil &&
            resource.availableUntil < new Date()
        ) {
            resource.status = "expired";
            await resource.save();

            return res.status(400).json({
                message: "This resource has expired"
            });
        }
        // Check availability
        if (resource.status !== "available") {
            return res.status(400).json({
                message: "Resource is not available"
            });
        }

        if (quantity > resource.availableQuantity) {
            return res.status(400).json({
                message: "Requested quantity is not available"
            });
        }

        // Prevent provider from requesting their own resource
        if (resource.provider.toString() === req.user.id) {
            return res.status(400).json({
                message: "You cannot request your own resource"
            });
        }

        const existingRequest = await ResourceRequest.findOne({
            resource: resourceId,
            requester: req.user.id,
            status: "pending"
        });

        if (existingRequest) {
            return res.status(400).json({
                message: "You already have a pending request for this resource"
            });
        }

        // Create request
        const request = await ResourceRequest.create({
            resource: resourceId,
            requester: req.user.id,
            quantity,
            message
        });

        res.status(201).json({
            message: "Resource request created successfully",
            request
        });

    } catch (error) {
        console.error("Create request error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getMyRequests = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const requests = await ResourceRequest.find({
            requester: req.user.id
        })
            .populate(
                "resource",
                "title category location availableQuantity status"
            )
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalRequests = await ResourceRequest.countDocuments({
            requester: req.user.id
        });

        res.status(200).json({
            page,
            limit,
            totalRequests,
            totalPages: Math.ceil(totalRequests / limit),
            requests
        });

    } catch (error) {
        console.error("Get my requests error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getProviderRequests = async (req, res) => {
    try {
        const resources = await Resource.find({
            provider: req.user.id
        }).select("_id");

        const resourceIds = resources.map(resource => resource._id);

        const requests = await ResourceRequest.find({
            resource: { $in: resourceIds }
        })
            .populate(
                "resource",
                "title category location availableQuantity status"
            )
            .populate(
                "requester",
                "name email"
            )
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: requests.length,
            requests
        });

    } catch (error) {
        console.error("Get provider requests error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const acceptRequest = async (req, res) => {
    try {
        const request = await ResourceRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        if (request.status !== "pending") {
            return res.status(400).json({
                message: "Only pending requests can be accepted"
            });
        }

        const resource = await Resource.findById(request.resource);

        if (!resource) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        // Check that the logged-in user owns the resource
        if (resource.provider.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to accept this request"
            });
        }

        // Check available quantity
        if (request.quantity > resource.availableQuantity) {
            return res.status(400).json({
                message: "Not enough resource available"
            });
        }

        // Reduce available quantity
        resource.availableQuantity -= request.quantity;

        // Update resource status if nothing remains
        if (resource.availableQuantity === 0) {
            resource.status = "unavailable";
        }

        await resource.save();

        // Accept request
        request.status = "accepted";
        await request.save();

        res.status(200).json({
            message: "Resource request accepted successfully",
            request,
            resource
        });

    } catch (error) {
        console.error("Accept request error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const rejectRequest = async (req, res) => {
    try {
        const request = await ResourceRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        if (request.status !== "pending") {
            return res.status(400).json({
                message: "Only pending requests can be rejected"
            });
        }

        const resource = await Resource.findById(request.resource);

        if (!resource) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        // Check resource ownership
        if (resource.provider.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to reject this request"
            });
        }

        request.status = "rejected";

        await request.save();

        res.status(200).json({
            message: "Resource request rejected successfully",
            request
        });

    } catch (error) {
        console.error("Reject request error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const cancelRequest = async (req, res) => {
    try {
        const request = await ResourceRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        // Check request ownership
        if (request.requester.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to cancel this request"
            });
        }

        // Only pending requests can be cancelled
        if (request.status !== "pending") {
            return res.status(400).json({
                message: "Only pending requests can be cancelled"
            });
        }

        request.status = "cancelled";

        await request.save();

        res.status(200).json({
            message: "Resource request cancelled successfully",
            request
        });

    } catch (error) {
        console.error("Cancel request error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createRequest,
    getMyRequests,
    getProviderRequests,
    acceptRequest,
    rejectRequest,
    cancelRequest
};