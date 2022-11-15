class ResponseHandler {
    constructor(status, success, response) {
        this.status = status;
        this.success = success;
        this.response = response;

        return this.toBlock();
    }

    toBlock = () => {
        return {
            status: this.status,
            payload: {
                success: this.success,
                [this.success ? "data" : "message"]: this.response
            }
        }
    }
}

module.exports.ValidRes = (value) => new ResponseHandler(200, true, value);
module.exports.CreatedRes = (value) => new ResponseHandler(201, true, value);
module.exports.ErrNotAuthed = () => new ResponseHandler(401, false, 'You are not authorised');
module.exports.ErrConflict = () => new ResponseHandler(409, false, "User already exist");
module.exports.ErrConfictPassword = () => new ResponseHandler(401, false, "Invalid current password");
module.exports.ErrSamePassword = () => new ResponseHandler(409, false, "This password is already in use");
module.exports.ErrUserNotFound = () => new ResponseHandler(404, false, "User not found");
module.exports.ErrSchema = (erros) => new ResponseHandler(422, false, erros);
module.exports.ErrPermissions = () => new ResponseHandler(403, false, "You don't have permissions for it");