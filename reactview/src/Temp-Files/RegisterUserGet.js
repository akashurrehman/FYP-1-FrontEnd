//Post User

const [formData, setFormData] = useState({
  fullName: '',
  city: '',
  bloodGroup: '',
  address: '',
  contactNo: '',
  email: '',
  gender: '',
  dob: ''
});
const handleSubmit = (event) => {
  event.preventDefault();

  axios.post('http://localhost:8081/api/user/registration/add', formData)
    .then(response => {
      console.log(response.data);
      // Do something after successful post request
    })
    .catch(error => {
      console.log(error);
      // Do something if post request fails
    });
}

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
}
<form onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
          </label>
          <label>
            City:
            <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
          </label>
          <label>
            Blood Group:
            <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
          </label>
          <label>
            Contact No:
            <input type="text" name="contactNo" value={formData.contactNo} onChange={handleInputChange} />
          </label>
          <label>
            Email:
            <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
          </label>
          <label>
            Gender:
            <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} />
          </label>
          <label>
            Date of Birth:
            <input type="text" name="dob" value={formData.dob} onChange={handleInputChange} />
          </label>
          <button type="submit">Submit</button>
        </form>

// function to handle the delete button click
const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/api/users/delete/${id}`)
      .then((response) => {
        console.log(response.data); // log the response from the backend
        // TODO: handle successful deletion, e.g. remove the deleted user from the UI
      })
      .catch((error) => {
        console.error(error); // log any errors
        // TODO: handle errors, e.g. show an error message to the user
      });
  }
  <button onClick={() => handleDelete("PR002")}>Delete</button>


  // For Updating Data

function UpdateUser() {
  const [userData, setUserData] = useState({
    fullName: "",
    city: "",
    bloodGroup: "",
    address: "",
    contactNo: "",
    email: "",
    gender: "",
    dob: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:8081/api/users/edit/${userId}`, userData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        value={userData.fullName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="city"
        value={userData.city}
        onChange={handleChange}
      />
      <input
        type="text"
        name="bloodGroup"
        value={userData.bloodGroup}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        value={userData.address}
        onChange={handleChange}
      />
      <input
        type="text"
        name="contactNo"
        value={userData.contactNo}
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        value={userData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="gender"
        value={userData.gender}
        onChange={handleChange}
      />
      <input
        type="text"
        name="dob"
        value={userData.dob}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// For getting all datas
const [users, setUsers] = useState([]);

useEffect(() => {
  axios.get('http://localhost:8081/api/users/registration')
    .then((response) => {
      console.log("Response is:",response);
      setUsers(response.data.results.bindings);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);
<div>
            {users.map(person => (
              <div key={person.persons.value}>
                <p>Name: {person.Name.value}</p>
                <p>ID: {person.ID.value}</p>
                <p>Email: {person.Email.value}</p>
                <p>Contact No: {person.ContactNo.value}</p>
                <p>Address: {person.Address.value}</p>
                <p>Blood Group: {person.BloodGroup.value}</p>
                <p>DOB: {person.DOB.value}</p>
                <p>Gender: {person.Gender.value}</p>
                <p>City: {person.City.value}</p>
              </div>
            ))}
          </div>

// For getting data by passing ID

function User({ match }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`/api/users/registration/${match.params.id}`) // match.params.id is the ID passed in the URL or /api/users/registration/PR002
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [match.params.id]);

  return (
    <div>
      <h2>User Details</h2>
      <p>ID: {user.ID}</p>
      <p>Name: {user.Name}</p>
      <p>Email: {user.Email}</p>
      <p>Contact No: {user.ContactNo}</p>
      <p>Address: {user.Address}</p>
      <p>Blood Group: {user.BloodGroup}</p>
      <p>DOB: {user.DOB}</p>
      <p>Gender: {user.Gender}</p>
      <p>City: {user.City}</p>
    </div>
  );
}

export default User;
