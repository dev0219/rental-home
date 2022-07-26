const {
    getUser,
    editUser,
    deleteUser,
} = require("../controllers/socketController.js");

const GetUsers = (io, socket) => async ( ) => {
    const res = await getUser();
    res.error ?
        socket.emit("getUsers_error", res.error)
        : socket.emit("getUsers_success", res.success)
}
const EditUser = (io, socket) => async ( {chosenUser, isEdit} ) => {
    const {email, name, password, userType} = chosenUser
    const res = await editUser(email, name, password, userType, _id, isEdit);
    res.error ?
        socket.emit("editUser_error", res.error)
        : socket.emit("editUser_success", res.success)
}
const DeleteUser = (io, socket) => async (id) => {
    const res = await deleteUser(id);
    res.error ?
        socket.emit("deleteUser_error", res.error)
        : socket.emit("deleteUser_success", res.success)
}

module.exports = { GetUsers, EditUser, DeleteUser }