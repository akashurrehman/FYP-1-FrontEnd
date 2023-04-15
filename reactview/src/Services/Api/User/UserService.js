import GenericService from "./GenericService";
class UserService extends GenericService {
    constructor() {
        super();
    }
    getUsers = () => this.get("api/users/registration");
    addUser = (data) => this.post("api/user/registration/add", data);
}

let userService = new UserService();
export default userService;