import React from 'react';
import {Link} from 'react-router-dom';

function Layout() {
  return (
        <div>
            <div>
                <nav>                 
                    <h2>Mindbowser</h2>
                    <li><Link id="logo" to="/create">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </nav>
            </div>
     </div>    
    )
}

export default Layout
