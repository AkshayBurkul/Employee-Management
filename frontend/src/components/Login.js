import  {React,useState} from 'react';
import { Row, FieldSet ,Button, Label ,Br} from '../utils/Styles';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import { Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';


function Login() {
    const [route,setRoute] = useState(false)
    const [loginData,setLoginData] = useState(
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
        else{
            axios.post('http://127.0.0.1:8000/api/login/',loginData)
                .then(res => {
                    swal(res.data);
                    if(res.data == "Login Succesfully"){
                        setRoute(true)
                    }
                })
                .catch(error => {
                    swal('error');
            });
    }}
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
                { route == true  && 
                    <Switch>
                            <Redirect to="/home"/>
                    </Switch>
                }
                </div>
            </div>    
        </div>
    )
}

export default Login
