import GenericService from "./GenericService";
class NotificationServiceCenter extends GenericService {
    constructor() {
        super();
    }
    getNotificationByRequestMakerID = (id) => this.get("api/users/notification/byCentreID/" + id);

}

let notificationService = new NotificationServiceCenter();
export default notificationService;