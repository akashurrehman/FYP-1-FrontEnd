import GenericService from "./GenericService";
class RequestMakerService extends GenericService {
    constructor() {
        super();
    }
    getRequestMakers = () => this.get("api/users/bloodrequest");
}

let requestMakerService = new RequestMakerService();
export default requestMakerService;