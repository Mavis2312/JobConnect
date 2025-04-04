import userModel from "../models/userModel.js";

export const userConstroller = async (req, res, next) => {
    const { name, lastName, email, password: location } = req.body;
    //validation
    if (!name || !lastName || !email || !location) {
        res.status(400);
        throw new Error('Please fill all the fields');
    }

    const user = await userModel.findOne({ email });
    try {
        if (user) {
            user.name = name;
            user.lastName = lastName;
            user.email = email;
            user.location = location;
            await user.save();
            res.status(200).json({ message: 'User updated successfully', token: user.createJWT() });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
