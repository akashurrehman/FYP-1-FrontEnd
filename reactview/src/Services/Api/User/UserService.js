import GenericService from "./GenericService";
class UserService extends GenericService {
    constructor() {
        super();
    }
    getUsers = () => this.get("api/users/registration");
    addUser = (data) => this.post("api/user/registration/add", data);
    getSingleUser = (id) => this.get("api/users/registration/" + id);
}

let userService = new UserService();
export default userService;