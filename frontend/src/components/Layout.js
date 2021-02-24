import {React,useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import { Switch,Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Button} from '../utils/Styles';

function Layout() {
    const [route,setRoute] = useState(false)
    const Logout = () => {
        setRoute(true)
        let jsonData={
            'action' :'logout'
        }
        axios.post('http://127.0.0.1:8000/api/logout/',jsonData)
        .then(res => {
            swal("Logout Successfully");
            if(res.data == "Logout"){
                setRoute(true)
            }
        })
        .catch(error => {
            swal('error');
    });
}
return (
        <div>
            <div>
                <nav>                 
                    <h2>Mindbowser</h2>
                    <li><Link id="logo" to="/create">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    { route == false &&
                        <li><Button style={{"background":"#0097f2"}} onClick = { () => Logout()}>Logout</Button></li>
                    }
                </nav>
            </div>
            { route == true  && 
                <Switch>
                        <Redirect to="/"/>
                </Switch>
            }
     </div>    
    )
}

export default Layout
