import { useState } from 'react';
import './App.css';
import Axios from 'axios'

function App() {

  const [name, setName] = useState("");
  const [gender, setGender] = useState(0);
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(0);
  const [address, setAddress] = useState("");

  const [newName, setNewName] = useState([]);

  const [ApplicantList, setApplicantsList] = useState([]);

  const addApplicant = () => {
    console.log(name + gender + email + contact + address);
    Axios.post("http://localhost:3001/create", {
      name: name,
      gender: gender,
      email: email,
      contact: contact,
      address: address,
    }).then(() => {
      setApplicantsList([
        ...ApplicantList,
        {
          name: name,
          gender: gender,
          email: email,
          contact: contact,
          address: address,
        },
      ]);
    });
  };

  const getApplicant = () => {
    Axios.get("http://localhost:3001/applicant").then((response) => {
      setApplicantsList(response.data);
    });
  };

  const updateApplicantName = (applicantsId) => {
    Axios.put("http://localhost:3001/update", { name: newName, applicantsId: applicantsId }).then((response) => {
      setApplicantsList(ApplicantList.map((val) => {
        return val.applicantsId == applicantsId ? { applicantsId: val.applicantsId, name: newName, gender: val.gender, email: val.email, contact: val.contact, address: val.address } : val
      }))
    })
  };

  const deleteApplicant = (applicantsId) => {
    Axios.delete(`http://localhost:3001/delete/${applicantsId}`).then((response) => {
      setApplicantsList(ApplicantList.filter((val) => {
        return val.applicantsId != applicantsId
      }))
    })
  };


  return (
    <div className="App">
      <div className="Container">
        <label>Name</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Gender:</label>
        <input type="text"
          onChange={(event) => {
            setGender(event.target.value);
          }}
        />
        <label>Email Address:</label>
        <input type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Contact No.:</label>
        <input type="number"
          onChange={(event) => {
            setContact(event.target.value);
          }}
        />
        <label>Address</label>
        <input type="text"
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />
        <button onClick={addApplicant}>Submit</button>
      </div>

      <hr className='lineBreak' />



      <div className='applicantSec'>
        <button onClick={getApplicant}>Show Applicant</button>
        {ApplicantList.map((val, key) => {
          return (
            <div className='applicantList'>
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Gender: {val.gender}</h3>
                <h3>Email: {val.email}</h3>
                <h3>Contact: {val.contact}</h3>
                <h3>Address: {val.address}</h3>
              </div>
              <div className='changeUpDel'>
                <input className='listInput' type='text' placeholder='Lance'
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                />
                <button onClick={() => { updateApplicantName(val.applicantsId) }}>Update</button>
                <button onClick={() => { deleteApplicant(val.applicantsId) }}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div >
  );
}

export default App;
