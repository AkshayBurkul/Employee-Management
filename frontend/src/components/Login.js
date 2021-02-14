import  {React,useState} from 'react';
import { Row, FieldSet ,Button, Label ,Br} from '../utils/Styles';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

function Login() {
    const [loginData,setLoginData]=useState(
        {
            'username':'',
            'password':''
        }
    )

    const handleOnChange = (event) => {
        setLoginData({...loginData, [event.target.name]: event.target.value});
    }
    const Login = () => {
        if(loginData.username == '' || loginData.password == ''){
            swal("All fields are required");
        }
    }
    return (
        <div>
            <div className="div2">
                <div className="container">
                    <FieldSet>
                        <Row style={{"text-align":"center"}}><Label >Please Login</Label></Row>
                        <Br/>
                        <Row>
                            <label>Username:</label>
                            <input type="text" name="username" id="username" value={loginData.username} onChange={handleOnChange}  />
                        </Row>
                        <Row>
                            <label>Password:</label>
                            <input type="password" name="password" id="password" value={loginData.password} onChange={handleOnChange}  />
                        </Row>
                        <Row>
                            <Button  style={{"background":"#0097f1"}} onClick = { () => Login()}>Login</Button>
                            <Link style={{"padding":"10px"}} to="/signup">Signup</Link>
                        </Row>
                </FieldSet>
                </div>
            </div>    
        </div>
    )
}

export default Login
