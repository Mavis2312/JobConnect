import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please enter a company name"],
    },
    position: {
        type: String,
        required: [true, "Please enter a position"],
        maxlength: 500,
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending",
    },
    workType: {
        type: String,
        enum: ["full-time", "part-time", "contract", "internship"],
        default: "full-time",
    },
    workLocation: {
        type: String,
        required: [true, "Work location is required"],
        default: "Pune",
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true
});


export default mongoose.model("Job", jobSchema);