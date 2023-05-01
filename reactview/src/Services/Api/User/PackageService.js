import GenericService from "./GenericService";
class PackageService extends GenericService {
    constructor() {
        super();
    }
    getFAQs = () => this.get("/api/admin/getFAQ");
    getSingleFAQ = (id) => this.get("api/admin/getFAQById/" + id);

    getAdvertisements = () => this.get("api/admin/getAdvertisement");
    getSingleAdvertisement = (id) => this.get("api/admin/getAdvertisementById/" + id);

    getCampaigns = () => this.get("api/admin/getCompaigns");
    getSingleCampaigns = (id) => this.get("api/admin/getCompaignsById/" + id);

    getEvents = () => this.get("api/admin/getEvents");
    getSingleEvent = (id) => this.get("api/admin/getEventsById/" + id);

    getFinancialDonations = () => this.get("api/admin/getFinancialDonation");
    getSingleFinancialDonation = (id) => this.get("api/admin/getFinancialDonationById/" + id);

    getJobPosts = () => this.get("api/admin/getJobPost");
    getSingleJobPost = (id) => this.get("api/admin/getJobPostByID/" + id);

    getNews = () => this.get("api/admin/getNews");
    getSingleNews = (id) => this.get("api/admin/getNewsById/" + id);

    getSponsors = () => this.get("api/admin/getSponsor");
    getSingleSponsor = (id) => this.get("/api/admin/getSponsor/" + id);

}

let packageService = new PackageService();
export default packageService;