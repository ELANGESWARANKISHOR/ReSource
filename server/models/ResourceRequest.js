const mongoose = require("mongoose");

const resourceRequestSchema = new mongoose.Schema(
    {
        resource: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resource",
            required: true
        },

        requester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        message: {
            type: String,
            trim: true,
            maxlength: 500
        },

        status: {
            type: String,
            enum: ["pending", "accepted", "rejected", "completed"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "ResourceRequest",
    resourceRequestSchema
);