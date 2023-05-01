import GenericService from "./GenericService";
class RequestMakerService extends GenericService {
    constructor() {
        super();
    }
    getRequestMakers = () => this.get("api/users/bloodrequest");
    addRequestMaker = (data) => this.post("api/user/bloodRequest/BloodRequestDetails/add", data);
    getSingleRequestMaker = (id) => this.get("api/users/bloodrequest/" + id);
    getRequestMakersByUserID = (id) => this.get("api/users/bloodrequest/byUserID/" + id);
}

let requestMakerService = new RequestMakerService();
export default requestMakerService;