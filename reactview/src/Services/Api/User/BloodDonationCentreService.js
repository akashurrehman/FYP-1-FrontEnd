import GenericService from "./GenericService";
class BloodDonationCentreService extends GenericService {
    constructor() {
        super();
    }
    getCentres = () => this.get("api/bloodCenter/RegisteredCenters");
    getSingleCentre = (id) => this.get("api/bloodCenter/RegisteredCenters/" + id);
}

let centreService = new BloodDonationCentreService();
export default centreService;