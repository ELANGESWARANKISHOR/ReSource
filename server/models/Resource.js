const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Food",
                "Furniture",
                "Electronics",
                "Clothing",
                "Construction",
                "Stationery",
                "Equipment",
                "Other"
            ]
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        availableQuantity: {
            type: Number,
            required: true,
            min: 0
        },

        condition: {
            type: String,
            required: true,
            enum: ["New", "Like New", "Good", "Fair", "Used"]
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        availableUntil: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ["available", "reserved", "completed", "expired"],
            default: "available"
        },

        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Resource", resourceSchema);