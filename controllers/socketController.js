const User = require("../models/userModal");

const getUser = async () => {
    try {
        const users = await User.find();
        if (users[0]) {
            return { success: users }
        } else {
            return { error: "No user found" }
        }
    } catch (e) {
        return { error: e }
    }
}
const editUser = async (email, name, password, userType, _id, isEdit) => {
    try {
        if (isEdit) {
            await User.findOneAndUpdate(
                { _id: _id },
                [{ $set: { email: email, name: name, userType: userType } }]
            );
        } else {
            const userExist = await User.findOne({ email });
            if (userExist) {
                res.status(400);
                return {error: "User Already Exist"}
            }

            const user = await User.create({
                name,
                email,
                userType,
                password:123123,
            });
        }
        const users = await User.find();
        if (users[0]) {
            return { success: users }
        } else {
            return { error: "No user found" }
        }
    } catch (e) {
        return { error: e }
    }
}
const deleteUser = async (id) => {
    try {
        await User.findOneAndDelete({ _id: id });
        const users = await User.find();
        if (users[0]) {
            return { success: users }
        } else {
            return { error: "No user found" }
        }
    } catch (e) {
        return { error: e }
    }
}
module.exports = { getUser, editUser, deleteUser }