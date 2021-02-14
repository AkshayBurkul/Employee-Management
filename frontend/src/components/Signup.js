import {React,useState} from 'react'
import { Row, FieldSet ,Button, Label ,Br ,Block } from '../utils/Styles'
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

function Signup() {
    const [signupData,setSignupData]=useState(
        {
            'username':'',
            'password':'',
            'conf_password':''
        }
    )

    const handleOnChange = (event) => {
        setSignupData({...signupData, [event.target.name]: event.target.value});
    }

    const Signup = () => {
        if(signupData.username == '' || signupData.password == '' || signupData.conf_password == ''){
            swal("All fields are required");
            return;
        }
        else if ((signupData.password).length < 8 || (signupData.conf_password).length < 8)
        {
            swal("Password length must be >= 8 characters.");
            return;
        }
    }
    return (
        <div>
            <div className="div2">
                <div className="container">
                    <FieldSet>
                        <Row style={{"text-align":"center"}}><Label >Please Signup</Label></Row>
                        <Br/>
                        <Block>
                            <Row>
                                <label>Username:</label>
                                <input type="text" name="username" id="username" value={signupData.username} onChange={handleOnChange} />
                            </Row>
                            <Row>
                                <label>Password:</label>
                                <input type="password" name="password" id="password" value={signupData.password} onChange={handleOnChange} />
                            </Row>
                            <Row>
                                <label>Confirm Password:</label>
                                <input type="password" name="conf_password" id="conf_password" value={signupData.conf_password} onChange={handleOnChange} />
                            </Row>
                            <Row>
                                <Button  style={{"background":"#0097f1"}} onClick = { () => Signup()}>Signup</Button>
                                <Link style={{"padding":"10px"}} to="/login">Login</Link>
                            </Row>
                        </Block>
                </FieldSet>
                </div>
            </div>    
        </div>
    )
}

export default Signup