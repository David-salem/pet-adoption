const { jwtSign } = require("../lib/JWT");
const { getUsers } = require("../repo/users.repo");

module.exports.getUserByEmail = async(Email) => {
    const list = await getUsers();
    const user = list.find(i => i.Email === Email);

    return user;
}

module.exports.getUserToken = (user) => {
    const { _id } = user;
    delete user.Password;

    const access_token = jwtSign({ _id });

    return access_token;
}