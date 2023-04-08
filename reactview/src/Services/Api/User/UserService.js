import GenericService from "./GenericService";
class UserService extends GenericService {
    constructor() {
        super();
    }
    getUsers = () => this.get("api/users/registration");
}

let userService = new UserService();
export default userService;