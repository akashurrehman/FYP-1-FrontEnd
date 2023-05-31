import jwtDecode from "jwt-decode";
import GenericService from "./GenericService";
import { toast } from "react-toastify";
import axios from "axios";

class UserLoginService extends GenericService {
    constructor() {
        super();
    }

    login = (data) => new Promise((resolve,reject) => {
        this.post("user/auth/login", data)
        
        .then((response) => {
            console.log(response);
            const token = response.headers && response.headers.Authorization;
            if (!token) {
                reject(new Error('Missing Authorization header in response'));
            } else {
                localStorage.setItem('token', token);
                console.log("Before Decode Token:", token);
                resolve(response);
            }
        })
        .catch((err) => {
            console.log(err);
            reject(err);
        });
    });

    register = (data) => new Promise((resolve,reject) => {
        this.post("api/user/registration/add", data)
        .then((dataToReturn) => {
            resolve(dataToReturn);
            console.log(dataToReturn); 
        })
        .catch((err) => {
            reject();
            console.log(err);
            
        });
    });
    
    logout = () => {

        //Get id from token 
        const token = localStorage.getItem('token');
        const decodedToken = token ? jwtDecode(token) : null;
        const id = decodedToken?.id;
        updateDonorAvailabilityStatus(id);

        localStorage.removeItem("token");
        localStorage.removeItem("donorEligible");
    }; 

    

    isLoggedIn = () => {
        return localStorage.getItem("token") ? true : false;
    };

    isLoggedInWithUserRole = () => {
        //Get id from token 
        const token = localStorage.getItem('token');
        const decodedToken = token ? jwtDecode(token) : null;
        const id = decodedToken?.id;
        const role = decodedToken?.role;
        if(id !== null && role === 'USER'){
            return true;
        }
        else{
            return false;
        }
    };
}

const updateDonorAvailabilityStatus = async (id) => {
    const availableStatus = 'Not Available';
    try {
        const response = await axios.put('http://localhost:8081/api/users/update/donorAvailabilityStatus/' + id, {
            availableStatus
        });
    } 
    catch (error) {
        if (error.response) {
            console.log(error.response.data.error);
        } 
        else {
            console.log('An error occurred');
        }
    }
}

let userLoginService = new UserLoginService;
export default userLoginService;