import React, { Component } from 'react';
import { Card } from 'react-bootstrap/';
import guide from './DB' //Import the file where the data is stored.
import Booking from './Booking';
import Calendar from './Calendar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Link
} from 'react-router-dom';
import { Container, Row,Button, Card} from 'react-bootstrap/';
import {Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Rater from 'react-rater';
import axios from 'axios'
import jwt_decode from 'jwt-decode'


class TourGuyProfile  extends Component {
  constructor(props){
    super(props);
    this.state={
      rate:  0,
      raters: 0,
      firstName:"",
      lastName: "",
      city:"",
      image:"",
      price:"",
      AboutMe:"",
      comment: [] ,
      id:this.props.match.params.id,
      startDate: new Date(),
      editing:false, 
      save:false,
      x:localStorage.getItem('usertoken'),
     user:""
    }
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
  }

 //helper functions that change state
 edit()
 {
   this.setState({editing:true});
   alert("now editing");
 }
 save()
 {
   this.setState({editing:false});
   //call the method below to update and tarnsfer the data to the back-end  
   this.onsubmitTheStateToEdit()
   //juts for testing 
   alert("now saving value ");
 }

changeTheStateForform = (e)=>{
 this.setState({
   [e.target.name] : e.target.value
 })
}

  componentDidMount() {
    axios.get(`http://localhost:7000/api/t-user/`+this.props.match.params.id)
      .then(response => {
        console.log(response);
          this.setState({firstName: response.data.firstName})
          this.setState({lastName: response.data.lastName} )
          this.setState({address: response.data.address})
          this.setState({city: response.data.city})
          this.setState({image: response.data.image} ) 
          this.setState({price: response.data.price} )
          this.setState({AboutMe: response.data.AboutMe} )
          this.setState({id: response.data._id} )
      });
////////////////////////////// Comment api
    axios.get(`http://localhost:7000/api/t-comment/`+this.props.match.params.id) 
          .then(res => {
            this.setState({comments: res.data})
          })
          .catch((error) => {
            console.log(error)
          })
  }


  onsubmitTheStateToPosted = ()=>{
    var x=localStorage.getItem('usertoken');
    var user =  jwt_decode(x)
    console.log(this.state.id)
    console.log(user.user._id)
    console.log(this.state.comment)
    axios.post("http://localhost:7000/api/r-comment/"+this.state.id+"/"+user.user._id,this.state)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    console.log("posted")
  }

  changeTheStateForform = (e)=>{
    console.log("inside add comment")
    this.setState({
      [e.target.name] : e.target.value
    })
    console.log("changeTheStateForform!!")
  }

  onsubmitTheStateToBook = ()=>{ 
    if (this.state.startDate==null){
      alert("please select date")
    }
    else{
      // console.log(this.state.user.user._id);
      var datetoB=this.state.startDate.toDateString();
      axios.post("http://localhost:7000/api/r-booking/"+this.state.id+"/"+this.state.user.user._id+"/"+datetoB,this.state)
      .then(
        (res) =>{ 
          console.log(res)
        })
      .catch(err => console.log(err))
    } 
  }


  showRate(e){
  if(this.state.rate/this.state.raters > 0)
  return (<h6>{ parseFloat(this.state.rate/this.state.raters).toFixed(1) } Stars</h6>)
}

  render() {


    let comments =   this.state.comments ? this.state.comments.map((item, index) => {
    return <li key={index}>{item.comment}</li> }) : "www"


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
            <img className="img-fluid rounded mb-4 mb-lg-0" src={this.state.image} alt="" />            </div>
            {/* /.col-lg-8 */}
            <div className="col-lg-5">
              <h1 className="font-weight-light">{this.state.firstName+" "+this.state.lastName}</h1>
              <p>{this.state.AboutMe}</p>
              <Rater total={5} rating={this.state.rate/this.state.raters} style={{cursor:'pointer'}} onRate={(rating)=>{this.setState((prev)=>({raters: prev.raters +1, rate: rating.rating + prev.rate}));}} /> 
                       {this.showRate()}
                       

              <br/><DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
              <div><Button onClick ={this.onsubmitTheStateToBook}  > Book </Button></div>


           
            </div>
            {/* /.col-md-4 */}
          </div>
          {/* /.row */}
          {/* Call to Action Well */}
          <div className="card text-white color my-5 py-4 text-center">
            <div className="card-body">
              <h1 className="text-white m-0">What our customers says about this tour guy</h1>
            

              <ul> 
               {comments} 
              </ul>
              <Form className="SignUp" onSubmit ={this.onsubmitTheStateToPosted}>
              <FormGroup >
              <Input type="textarea" name="comment" id="exampleText" placeholder="Write your comment here" onChange={this.changeTheStateForform}/>
              <Button onClick ={this.onsubmitTheStateToPosted}>Add comment<img src={'https://i.postimg.cc/3NQ9Fmr5/blog.png'} width="30" height="30"/></Button>
              </FormGroup>
              </Form>
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