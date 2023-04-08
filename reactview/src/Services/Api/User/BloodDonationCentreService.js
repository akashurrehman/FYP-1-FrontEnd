import GenericService from "./GenericService";
class BloodDonationCentreService extends GenericService {
    constructor() {
        super();
    }
    getCentres = () => this.get("api/bloodCenter/RegisteredCenters");
}

let centreService = new BloodDonationCentreService();
export default centreService;