import GenericService from "./GenericService";
class DonorService extends GenericService {
    constructor() {
        super();
    }
    getDonors = () => this.get("api/users/donate");
}

let donorService = new DonorService();
export default donorService;