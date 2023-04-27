import GenericService from "./GenericService";
class PackageService extends GenericService {
    constructor() {
        super();
    }
    getFAQs = () => this.get("/api/admin/getFAQ");
    getAdvertisements = () => this.get("api/admin/getAdvertisement");
    getCampaigns = () => this.get("api/admin/getCompaigns");
    getEvents = () => this.get("api/admin/getEvents");
    getFinancialDonations = () => this.get("api/admin/getFinancialDonation");
    getJobPosts = () => this.get("api/admin/getJobPost");
    getSingleJobPost = (id) => this.get("api/admin/getJobPostByID/" + id);
    getNews = () => this.get("api/admin/getNews");
    getSponsors = () => this.get("api/admin/getSponsor");
}

let packageService = new PackageService();
export default packageService;