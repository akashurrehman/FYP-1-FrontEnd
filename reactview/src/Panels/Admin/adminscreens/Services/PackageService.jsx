import GenericService from "./GenericService";
class PackageService extends GenericService {
    constructor() {
        super();
    }
    getFAQs = () => this.get("/api/admin/getFAQ");
    getSingleFAQ = (id) => this.get("api/admin/getFAQById/" + id);
    deleteFaq = (id) => this.delete("api/admin/deleteFAQ/" + id);

    getAdvertisements = () => this.get("api/admin/getAdvertisement");
    getSingleAdvertisement = (id) => this.get("api/admin/getAdvertisementById/" + id);
    deleteAdv = (id) => this.delete("api/admin/deleteCompaigns/" + id);

    getCampaigns = () => this.get("api/admin/getCompaigns");
    getSingleCampaigns = (id) => this.get("api/admin/getCompaignsById/" + id);
    deleteCampaign = (id) => this.delete("api/admin/deleteCompaigns/" + id);

    getEvents = () => this.get("api/admin/getEvents");
    getSingleEvent = (id) => this.get("api/admin/getEventsById/" + id);
    deleteEvent = (id) => this.delete("api/admin/deleteEvents/" + id);

    getFinancialDonations = () => this.get("api/admin/getFinancialDonation");
    getSingleFinancialDonation = (id) => this.get("api/admin/getFinancialDonationById/" + id);
    deletefdon = (id) => this.delete("api/admin/deleteFinancialDonation/financialDonationDetails/delete/" + id);

    getJobPosts = () => this.get("api/admin/getJobPost");
    getSingleJobPost = (id) => this.get("api/admin/getJobPostByID/" + id);
    deleteJobs = (id) => this.delete("api/admin/deleteJobPost/" + id);

    getNews = () => this.get("api/admin/getNews");
    getSingleNews = (id) => this.get("api/admin/getNewsById/" + id);
    deleteNews = (id) => this.delete("api/admin/deleteNews/" + id);

    getSponsors = () => this.get("api/admin/getSponsor");
    getSingleSponsor = (id) => this.get("/api/admin/getSponsor/" + id);
    deleteSponsor = (id) => this.delete("api/admin/deleteSponsor/" + id);

}

let packageService = new PackageService();
export default packageService;