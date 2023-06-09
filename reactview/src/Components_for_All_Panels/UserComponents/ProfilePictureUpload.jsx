import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { Button, Col, Form, Image, Nav, Row } from 'react-bootstrap';

const ProfilePictureUpload = () => {

    //Get id from token 
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;

    const [selectedImage, setSelectedImage] = useState(null);
    const [message, setMessage] = useState("");

    const [image, setImage] = React.useState('');

    React.useEffect(() => {
        getImage();
        console.log(image);
    },[]);

    const getImage = () => {
        const name = decodedToken?.name;
        console.log(name);
        const userName = name + "_PROFILE";
        axios
            .get("http://localhost:3003/users/images/" + userName)
            .then((res) => {
                setImage(res.data);
            })
            .catch((error) => {
                console.log("error",error)
            });
    };


    const handleFileChange = (event) => {
        event.preventDefault();
        setSelectedImage(event.target.files[0]);
        
    };

    const handleImageSubmit = () => {
        const userName = decodedToken?.name;
        console.log(userName);
        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("userName", userName + "_PROFILE");
        console.log(selectedImage);   
        axios
            .post("http://localhost:3003/users/upload", formData)
            .then((res) => {
                console.log(res.data)
                setMessage(res.data.message);
                window.location.reload();
            })
            .catch((error) => {
                setMessage(error.message);
                console.log("error",error)
            });
    };

    return (
        <div>
            <div
                style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto',
                marginBottom: '10%',
                }}
            >
                {image ? (
                    <img src={`http://localhost:3003/${image.imagePath.replace(/\\/g, '/').replace('public/', '')}`} alt="Image" width='100%' height='100%' />
                ) : (
                    <div
                        style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f0f0f0',
                        }}
                    >
                        <span>Upload Profile Picture</span>
                    </div>
                )}
            </div>
            {image ? (
                <></>
            ):(
                <>
                    <form>
                        <input size='sm' type="file" accept="image/*"  onChange={handleFileChange} />
                        {message && <p>{message}</p>}
                    </form>
                    <div style={{textAlign:'right',marginTop:'5%'}}>
                        <Button variant='flat' size='sm' onClick={handleImageSubmit}>
                            Upload
                        </Button>
                    </div>
                </>
            )}
            
        </div>
    );
};

export default ProfilePictureUpload;
