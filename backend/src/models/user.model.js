import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"], 
        lowercase: [true, "Email must be in lowercase"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
});

const userModel = mongoose.model("user", userSchema);

export default userModel;