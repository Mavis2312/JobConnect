import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {

    const { name, email, password } = req.body;

    //validate the input
    if (!name) {
        next("name is required");
    }
    if (!email) {
        next("email is required");
    }
    if (!password) {
        next("password is required and greater than 6 character");
    }

    //check if the user already exists via email
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
        next("Email Already Register Please Login");
    }

    const user = await userModel.create({ name, email, password });

    // creating a token
    const token = user.createJWT();


    res.status(201).send({
        success: true,
        message: "User created successfully",
        user: {
            userId: user._id,
            name: user.name,
            email: user.email,
            location: user.location,
            createdAt: user.createdAt,

        },
        token
    })
};

export const loginController = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        next(`Please provide email and password`);
    }
    //find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
        next(`Invalid user or password`);
    }

    //compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        next(`Invalid user or password`);
    }

    //creating token
    const token = user.createJWT();
    res.status(200).send({
        success: true,
        message: "User logged in successfully",
        user: {
            userId: user._id,
            name: user.name,
            email: user.email,
            location: user.location,
            createdAt: user.createdAt,
        },
        token
    })
}

