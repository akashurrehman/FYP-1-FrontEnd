import GenericService from "./GenericService";
class AppointmentService extends GenericService {
    constructor() {
        super();
    }
    
    getAppointmentsByUserID = (id) => this.get("api/users/appointment/byUserID/" + id);
    deleteAppointment = (id) => this.delete("api/user/appointment/AppointmentDetails/delete/" + id);
}

let appointmentService = new AppointmentService();
export default appointmentService;