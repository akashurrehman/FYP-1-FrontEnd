import GenericService from "./GenericService";
class DonorService extends GenericService {
    constructor() {
        super();
    }
    getDonors = () => this.get("api/users/donate");
    addDonor = (data) => this.post("api/users/donate/addDonorInfo",data);
}

let donorService = new DonorService();
export default donorService;