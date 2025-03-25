import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        Select: false
    },
    location: {
        type: String,
        default: "India"
    }
}, {
    timestamps: true
}

);

//middlware for hashing password
userSchema.pre("save", async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//middleware for comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {

    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
}

// middleware for generating token
userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
}

export default mongoose.model("User", userSchema);
// The code above is the model for the user. It is a schema that defines the structure of the user object. It has fields like name, email, password, location, etc. The model is exported so that it can be used in other parts of the application like the controller.