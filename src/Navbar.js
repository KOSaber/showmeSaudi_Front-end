import React from "react";
import {
  Navbar,
  NavbarBrand,
  Container,
} from "reactstrap";
import "../src/App.css";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Home from './Home'
import Packages from './Packages'
import Contact from './Contact'
import TourGuys from './TourGuys'
import SignIn from './SignIn'
import About from './About'
import SignUp from './SignUp'
import TourGuyProfile from './TourGuyProfile'
import Comment from './Comment'



class NavbarMain extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      wether: '',
      icon: ''
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
   
    return (
      <Router>

        <Navbar
          color="faded"
          dark
          expand="md"
          fixed={`top`}
          className="navDark"
        >
        <Container className="AppIc">
          <NavbarBrand> <img src={'https://image.flaticon.com/icons/svg/1373/1373039.svg'} width="50" height="50" /> <span className='NavJed'>ShowMeSaudi</span></NavbarBrand>
        </Container>

       <Container>
          <NavbarBrand> <Link to="/" className="NavLink">Home</Link> </NavbarBrand>
          <NavbarBrand> <Link to="/TourGuys" className="NavLink">Tour Guys</Link> </NavbarBrand>
          <NavbarBrand> <Link to="/Packages" className="NavLink">Packages</Link> </NavbarBrand>
          <NavbarBrand> <Link to="/SignIn" className="NavLink">Sign In</Link> </NavbarBrand>
          <NavbarBrand> <Link to="/About" className="NavLink">About Us</Link> </NavbarBrand>
          <NavbarBrand> <Link to="/contact" className="NavLink">Contact</Link> </NavbarBrand>
        </Container>
        </Navbar>

       


        <div>
        <Route exact path="/" component={Home} />
        <Route path="/TourGuys" component={TourGuys} />
        <Route path="/Packages" component={Packages} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/About" component={About} />
        <Route path="/Contact" component={Contact} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/TourGuyProfile/:id" component={TourGuyProfile} />
        <Route path="/Comment" component={Comment} />
        </div>

     
      </Router>  
    );
  }
}

export default NavbarMain;
