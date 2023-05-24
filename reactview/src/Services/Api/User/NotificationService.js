import GenericService from "./GenericService";
class NotificationService extends GenericService {
    constructor() {
        super();
    }
    getNotificationByRequestMakerID = (id) => this.get("api/users/notification/byRequestMakerID/" + id);

}

let notificationService = new NotificationService();
export default notificationService;