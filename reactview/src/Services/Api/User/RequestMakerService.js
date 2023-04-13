import GenericService from "./GenericService";
class RequestMakerService extends GenericService {
    constructor() {
        super();
    }
    getRequestMakers = () => this.get("api/users/bloodrequest");
    addRequestMaker = (data) => this.post("api/user/bloodRequest/BloodRequestDetails/add", data);
}

let requestMakerService = new RequestMakerService();
export default requestMakerService;