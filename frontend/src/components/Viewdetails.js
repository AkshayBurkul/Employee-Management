import React, { useState, useEffect } from 'react';
import { Row, PopupContainer,Column, Label, Br, Button} from '../utils/Styles';
import Popup from 'reactjs-popup';
import axios from 'axios';
import swal from 'sweetalert';

function Viewdetails() {
    const [data,setdata]=useState()
    const [selectEmployee,setSelectEmployee] = useState()
    const [modalOpen,setModalopen] = useState(false)
    const [readOnly,setReadOnly] = useState(false)

    const EMPLOYEE_DEFAULT_VALUE = {
        "id": "",
        "firstname":"",
        "lastname": "",
        "email": "",
        "password":"",
        "address": "",
        "dob": "",
        "company": "",
        "mobile": "",
        "city": "",
    }

    useEffect(() =>{
        axios.get('http://127.0.0.1:8000/api/employee/')
        .then(res =>{
            setdata(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, []);

    const Save = (id) =>{
        if(selectEmployee.password === '' || selectEmployee.password === undefined){
            swal('Please enter password');
            return;
        }
        else if ((selectEmployee.password).length < 8 )
        {
            swal("Password length must be >= 8 characters.");
            return;
        }
        else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(selectEmployee.email))
        {
            swal("Enter valid email id")
            return;
        }
        else{
            if(readOnly){
                axios.post('http://127.0.0.1:8000/api/employee/',selectEmployee)
                    .then(res => {
                        swal("Employee details save successfully.", { icon: "success"});
                        setTimeout(function(){ window.location.reload() }, 2000);
                    })
                    .catch(error => {
                            swal({text: "All fields are mandatory" , icon: "error"});
                    });
                }
            else {
                swal({text: "Are you sure you want to update this employee details",
                buttons: ['No', 'Yes'],
                dangerMode: true
                })
                .then((isConfirm) => {
                    if (isConfirm) {
                        axios.put('http://127.0.0.1:8000/api/employee/' + id , selectEmployee)
                        .then(res => {
                                swal("Employee details update successfully.");
                                setTimeout(function(){ window.location.reload() }, 2000);
                            })
                            .catch(error => {
                                    swal({text: "Unable to connect to the Api" , icon: "error"});
                            });
                        }})
                }
        }   }
        
    const deleteEmployee = (id) => {
    swal({text: "Are you sure you want to delete this employee details",
            buttons: ['No', 'Yes'],
            dangerMode: true
    })
    .then((isConfirm) => {
        if (isConfirm) {
            axios.delete('http://127.0.0.1:8000/api/employee/' + id)
                .then(res => {
                    swal("employee details deleted successfully.", { icon: "success"});
                    setTimeout(function(){ window.location.reload() }, 2000);
                })
                .catch(error =>  {
                        swal({text: "Unable to connect" , icon: "error"})
                });
        }
    });
    }
    
    const AddEmployee = () => {
        setReadOnly(true)
        setModalopen(true)
        setSelectEmployee(EMPLOYEE_DEFAULT_VALUE);
    }

    const UpdateEmployee =(index) => {
        setReadOnly(false)
        setModalopen(true)
        setSelectEmployee(data[index])
    }

    const contentStyle = {
        margin: "auto",
        background: "rgb(255, 255, 255)",
        width: "700px",
        padding: "20px",
        border: "1px solid #d7d7d7",
        height: "350px"
    };

    const overlayStyle = { background: 'rgba(0,0,0,0.1)' };

    return (
        <div>
            {data && 
            <div className="div2">
                <div className="container">
                    <Button  style={{"float":"right","background":"#0097f1"}} onClick ={ () => AddEmployee()}>Add Employee</Button>
                    <Popup modal open={modalOpen}{...{ contentStyle, overlayStyle}}>
                        <EmployeePopup setModalopen={setModalopen} readOnly={readOnly} Save={Save} setSelectEmployee={setSelectEmployee} data={data} setdata={setdata} selectEmployee={selectEmployee}/>
                    </Popup>
                    <table id="t01">
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Password</th>
                            <th>Address</th>
                            <th>Dob</th>
                            <th>Company</th>
                            <th>Mobile</th>
                            <th>City</th>
                            <th>Actions</th>
                        </tr>
                        {data.map((data,index) =>(
                        <tr>
                            <td style={{"width":"2px"}}>{data.emp_id}</td>
                            <td>{data.email}</td>
                            <td>{data.firstname}</td>
                            <td>{data.lastname}</td>
                            <td>{data.password}</td>
                            <td>{data.address}</td>
                            <td>{data.dob}</td>
                            <td>{data.company}</td>
                            <td>{data.mobile}</td>
                            <td>{data.city}</td>
                            <td>
                                <Row>
                                    <Button id="small-button" style={{"background":"#0097f1"}} onClick ={ () => UpdateEmployee(index)}>Update</Button>
                                    <Button id="small-button" style={{"background":"#FF7F50"}}onClick ={ () => deleteEmployee(data.id)} >Delete</Button>
                                </Row>
                            </td>
                        </tr>
                        ))}
                        </table>
                </div>
            </div>    
        } 
    </div>
    )
}

export default Viewdetails

const EmployeePopup = (props) => {
    const { setModalopen,selectEmployee,setSelectEmployee,readOnly ,Save} = props;

    const Cancel = () => {
        setModalopen(false)
    }

    const handleOnChange = (event) => {
        setSelectEmployee({...selectEmployee, [event.target.name]: event.target.value});
    }

    return(
        <div>
            <Label>{readOnly ? "Add" : "Update"} Employee Details</Label>
            <Br/>
            <PopupContainer>
                <Column>
                <Row>
                    <label>Id:</label>
                    <input type="number" required name="emp_id" id="id" value={selectEmployee.emp_id} onChange={handleOnChange} />
                </Row>   
                <Row>
                    <label>Email:</label>
                    <input type="text" name="email" id="email" value={selectEmployee.email} onChange={handleOnChange} />
                </Row>    
                <Row>
                    <label>Firstname:</label>
                    <input type="text" name="firstname" id="firtsname" value={selectEmployee.firstname} onChange={handleOnChange}/>
                </Row>
                <Row>
                    <label>Lastname:</label>
                    <input type="text" name="lastname" id="lastname" value={selectEmployee.lastname} onChange={handleOnChange}/>
                </Row>
                <Row>
                    <label>Password:</label>
                    <input type="password" name="password" id="password" value={selectEmployee.password} onChange={handleOnChange} />
                </Row>
                </Column>
                <Column>
                <Row>
                    <label>Address:</label>
                    <input type="text"  name="address" id="address" value={selectEmployee.address} onChange={handleOnChange} />
                </Row>    
                <Row>
                    <label>Dob:</label>
                    <input type="text"  name="dob" id="dob" value={selectEmployee.dob} onChange={handleOnChange} />
                </Row>
                <Row>
                    <label>Company:</label>
                    <input type="text" name="company" id="company" value={selectEmployee.company} onChange={handleOnChange}/>
                </Row>
                <Row>
                    <label>Mobile:</label>
                    <input type="text"  name="mobile" id="mobile" value={selectEmployee.mobile} onChange={handleOnChange} />
                </Row>
                <Row>
                    <label>City:</label>
                    <input type="text"  name="city" id="city" value={selectEmployee.city} onChange={handleOnChange}/>
                </Row>
                <Row>
                    <Button style={{"float":"center","background":"#0097f1"}} onClick ={ () => Save(selectEmployee.id)}>Save</Button>
                    <Button style={{"float":"center", "background":"#FF7F50"}} onClick ={ () => Cancel()}>Cancel</Button>
                </Row>
                </Column>
            </PopupContainer>
        </div>
    )
}
