import GenericService from "./GenericService";
import { toast } from "react-toastify";

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
        localStorage.removeItem("token");
    }; 

    isLoggedIn = () => {
        return localStorage.getItem("token") ? true : false;
    };
}

let userLoginService = new UserLoginService;
export default userLoginService;