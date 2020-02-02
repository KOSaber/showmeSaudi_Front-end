import React, { Component } from 'react';
import { Card } from 'react-bootstrap/';
import guide from './DB' //Import the file where the data is stored.
import {
  Link
} from 'react-router-dom';
import { Container, Row,Button} from 'react-bootstrap/';
import Rater from 'react-rater';
import axios from 'axios'
import Booking from './Booking';
import jwt_decode from 'jwt-decode';
import Calendar from './Calendar';


class TourGuyProfile  extends Component {
  constructor(props){
    super(props);
    this.state={
      rate:  0,
      raters: 0,
      firstName:"",
      lastName: "",
      address:"",
      img:"",
      rate:"",
      price:"",
      AboutMe:"",
      id:this.props.match.params.id
    }
  }

  componentDidMount() {
{/* <Booking></Booking> */}
    axios.get(`http://localhost:7000/api/t-user/`+this.props.match.params.id)
      .then(response => {
        //console.log(response);
          this.setState({firstName: response.data.firstName})
          this.setState({lastName: response.data.lastName} )
          this.setState({address: response.data.address})
          this.setState({img: response.data.img} )
          this.setState({rate: response.data.rate} )
          this.setState({price: response.data.price} )
          this.setState({AboutMe: response.data.AboutMe} )
          this.setState({id: response.data._id} )
      });
  }

  onsubmitTheStateToBook = ()=>{

    var x=localStorage.getItem('usertoken');
    var user =  jwt_decode(x)
    //we need to pass this for r-booking
    console.log(user.user._id)
    axios.post("http://localhost:7000/api/r-booking/"+this.state.id+"/"+user.user._id,this.state)
    .then(
      (res) =>{ 
        console.log(res)
        
      })
    .catch(err => console.log(err))
  }

  showRate(e){
  if(this.state.rate/this.state.raters > 0)
  return (<h6>{ parseFloat(this.state.rate/this.state.raters).toFixed(1) } Stars</h6>)
}

  render() {
    // console.log(this.state.rate);
    //   console.log(this.state.raters);
    const AllPackages=guide.map((item, index) => {

          
      return <div key={index} className='Card'>
     <div className='ContainerHomeCity'>
         
          <Card style={{ width: '15rem', margin: '2px', marginBottom: '30px' }} className="cardHov">
              {/* Add onClick event handler to the name and an image of the place */}

              <Card.Img variant="top" src={item.imgSrc} width="250" height="250" />
              <Card.Body>
              {/* {item.city} */}
              <Card.Body>Package Name &nbsp; <img src={'https://i.postimg.cc/cHtxQ60w/tour.png'} width="30" height="30" /></Card.Body>
              <Card.Body>Description about the Package</Card.Body>            
              </Card.Body>
          </Card>
      </div>
      </div>
  })   
    
    return (
      <div>
        <br/>
        {/* Page Content */}
        <div className="container">
          {/* Heading Row */}
          <div className="row align-items-center my-5">
            <div className="col-lg-7">
              <img className="img-fluid rounded mb-4 mb-lg-0" src={this.state.img} alt="" />
            </div>
            {/* /.col-lg-8 */}
            <div className="col-lg-5">
              <h1 className="font-weight-light">{this.state.firstName+" "+this.state.lastName}</h1>
              <p>{this.state.AboutMe}</p>
              <Rater total={5} rating={this.state.rate/this.state.raters} style={{cursor:'pointer'}} onRate={(rating)=>{this.setState((prev)=>({raters: prev.raters +1, rate: rating.rating + prev.rate}));}} /> 
                       {this.showRate()}
                       

              <br/><Calendar/>
              <div><Button onClick ={this.onsubmitTheStateToBook}  size="sm" > Book </Button></div>
            </div>
            {/* /.col-md-4 */}
          </div>
          {/* /.row */}
          {/* Call to Action Well */}
          <div className="card text-white color my-5 py-4 text-center">
            <div className="card-body">
              <h1 className="text-white m-0">What our customers says about this tour guy</h1>
              <ul>
                <li>Comment1</li>
                <li>Comment2</li>
                <li>Comment4</li>
              </ul>
              <Link to="/Comment" className="Link">Add comment <img src={'https://i.postimg.cc/3NQ9Fmr5/blog.png'} width="30" height="30" /></Link>
              
            </div>
          </div>
          <Container >
            <Row className='Cont'>
                  {/* render the list of city generated in the render method above */}
                  {AllPackages}
            </Row>
        </Container>

        {/* /.container */}
      </div>
    </div>
  );}
  
};

export default TourGuyProfile;