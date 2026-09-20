const Resource = require("../models/Resource");

const createResource = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            quantity,
            condition,
            location,
            availableUntil
        } = req.body;

        if (
            !title ||
            !description ||
            !category ||
            !quantity ||
            !condition ||
            !location ||
            !availableUntil
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const resource = await Resource.create({
            title,
            description,
            category,
            quantity,
            availableQuantity: quantity,
            condition,
            location,
            availableUntil,
            provider: req.user.id
        });

        res.status(201).json({
            message: "Resource created successfully",
            resource
        });

    } catch (error) {
        console.error("Create resource error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getResources = async (req, res) => {
    try {
        const resources = await Resource.find({
            status: "available",
            availableQuantity: { $gt: 0 }
        })
            .populate("provider", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: resources.length,
            resources
        });

    } catch (error) {
        console.error("Get resources error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createResource,
    getResources
};