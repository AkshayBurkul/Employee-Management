import './App.css';
import Layout from './components/Layout';
import Viewdetails from './components/Viewdetails';
import { Switch,Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  return (
    <div className="App">
      <Layout/>
      <Switch>
        <Route exact path="/" component={props => <Login {...props} />}/>
        <Route exact path="/signup" component={props => <Signup {...props} />}/>
        <Route exact path="/home" component={props => <Viewdetails {...props} />}/>
        <Redirect to="/"/>
      </Switch>
    </div>
  );
}
export default App;
