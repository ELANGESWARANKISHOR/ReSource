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
        const { category, location, condition, search } = req.query;

        const filter = {
            status: "available",
            availableQuantity: { $gt: 0 }
        };

        if (category) {
            filter.category = category;
        }

        if (location) {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }

        if (condition) {
            filter.condition = condition;
        }

        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        const resources = await Resource.find(filter)
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

const getResourceById = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id)
            .populate("provider", "name email");

        if (!resource) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        res.status(200).json({
            resource
        });

    } catch (error) {
        console.error("Get resource error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const updateResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        // Check ownership
        if (resource.provider.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to update this resource"
            });
        }

        const {
            title,
            description,
            category,
            quantity,
            condition,
            location,
            availableUntil
        } = req.body;

        resource.title = title || resource.title;
        resource.description = description || resource.description;
        resource.category = category || resource.category;
        resource.condition = condition || resource.condition;
        resource.location = location || resource.location;
        resource.availableUntil = availableUntil || resource.availableUntil;

        if (quantity !== undefined) {
            const quantityDifference = quantity - resource.quantity;

            resource.quantity = quantity;
            resource.availableQuantity += quantityDifference;

            if (resource.availableQuantity < 0) {
                resource.availableQuantity = 0;
            }
        }

        const updatedResource = await resource.save();

        res.status(200).json({
            message: "Resource updated successfully",
            resource: updatedResource
        });

    } catch (error) {
        console.error("Update resource error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        // Check ownership
        if (resource.provider.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to delete this resource"
            });
        }

        await Resource.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Resource deleted successfully"
        });

    } catch (error) {
        console.error("Delete resource error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createResource,
    getResources,
    getResourceById,
    updateResource,
    deleteResource
};