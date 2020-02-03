import React, { Component } from 'react';
import { Card } from 'react-bootstrap/';
import '../App.css';
// import '../../node_modules/bulma/css/bulma.css'
import guide from '../DB' //Import the file where the data is stored.
import {
  Link
} from 'react-router-dom';
import { Container, Row,Button} from 'react-bootstrap/';
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
      address:"",
      img:"",
      rate:"",
      price:"",
      AboutMe:"",
      id:this.props.match.params.id, 
      editing:false, 
      save:false
    };
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    // this.onsubmitTheStateToEdit = this.onsubmitTheStateToEdit.bind(this);
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
          this.setState({city: response.data.city})
          this.setState({img: response.data.img} )
          this.setState({rate: response.data.rate} )
          this.setState({price: response.data.price} )
          this.setState({AboutMe: response.data.AboutMe} )
          this.setState({id: response.data._id} )
          this.setState({id: response.data.package} )
      }).catch((err)=> console.log("data has not been recived"));

    }

// EDIT PROFILE 
onsubmitTheStateToEdit = ()=>{

  axios.put("http://localhost:7000/api/t-user_edit/"+this.props.match.params.id, this.state)
  .then((res) =>
  {
    console.log("what data do u have ", res)

  } 
    

)
  
  .catch(err => console.log(err))
}




//BOOKING 
onsubmitTheStateToBook = ()=>{
    var x=localStorage.getItem('usertoken');
    var user =  jwt_decode(x)
    //we need to pass this for r-booking
    console.log(user.user._id)
    axios.post("http://localhost:7000/api/r-booking/"+this.state.id,this.state)
    .then(
      (res) =>{ 
        console.log(res)
    var user =  jwt_decode(res.data.token)
    console.log(user)

      if(user.user.tourType==="regUser"){
        this.props.history.push("./");
      }
      else{
        console.log("Tour user");        
        this.props.history.push("./TourGuyProfile")
      }
      })
    .catch(err => console.log(err))
  }

  showRate(e){
  if(this.state.rate/this.state.raters > 0)
  return (<h6>{ parseFloat(this.state.rate/this.state.raters).toFixed(1) } Stars</h6>)
}

  renderNormal() {
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
       
          {/* Heading Row */}
          <br/> <br /><br />
          <br /><br />
          
          <article className="box media">
            <div className="media-left">
              <figure>
              <img src={this.state.img} alt="" class="img-thumbnail" />
              
                </figure>
                </div>
                <div className="media-content">
                <h2> {this.state.firstName+" "+this.state.lastName} </h2>
                <p><strong>About me: {this.state.AboutMe}</strong></p>
                <p><strong>Price: {this.state.price}</strong></p>
                <p><strong>City: {this.state.city}</strong></p>
                <p><strong>Pakage Name:{this.state.package}</strong></p>
                </div>
                <div classNmae="media-right">
                <Button variant="outline-primary" onClick={this.edit}>Edit Proile</Button>
                </div>

              </article>
              <article className="box media">
              <div className="media-left">
                <Rater total={5} rating={this.state.rate/this.state.raters} style={{cursor:'pointer'}} onRate={(rating)=>{this.setState((prev)=>({raters: prev.raters +1, rate: rating.rating + prev.rate}));}} /> 
                       {this.showRate()}
              <Button onClick ={this.onsubmitTheStateToBook} > Booking</Button>
                  </div>
             </article>
         
          <div className="container">
          
          <Container >
            <Row className='Cont'>
                  {/* render the list of city generated in the render method above */}
                  {AllPackages}
            </Row>
        </Container>

        {/* /.container */}
      </div>

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
    </div>
  );
}
renderEdit()
{
  return(
<div  className="central">
<br/><br/><br/><br/>
    <article className="box media center-block">
    
     <br/><br/><br/><br/>
    <div className="media-left">
     {/* add img latter */}
      <figure>
      <img src={this.state.img} alt="" class="img-thumbnail" />
        </figure>
      </div>
      <div className="media-content">
       
    
    
        <p>
        <strong>First Name:</strong>
        <input type="text" className="input" name="firstName" onChange={this.changeTheStateForform}
        defaultValue={this.state.firstName}/ >    
        </p>
    
        <p>
        <strong>Last Name:</strong>
        <input type="text" className="input" name="lastName" onChange={this.changeTheStateForform}
        defaultValue={this.state.lastName}/ >    
        </p>
    
    
        <p>
        <strong>About Me:</strong>
        <input type="text" className="input" name="AboutMe" onChange={this.changeTheStateForform}
        defaultValue={this.state.AboutMe}/ >  
        </p>

        <p>
        <strong> Price:</strong>
        <input type="text" className="input" name="price" onChange={this.changeTheStateForform}
        defaultValue={this.state.price}/ > per hour
     
    
        </p>


        {/* <p>
          Add  package to your profile:
        <strong> Package Name:</strong>
        <input type="text" className="input" name="packName" onChange={this.changeTheStateForform}
        defaultValue={this.state.package[0].packName}/ > per hour
     
    
        </p> */}

       
      
        </div>
        <div className="media-right">
        {/* <Button variant="outline-warning" onClick={this.onsubmitTheStateToEdit}>Update</Button> */}
        <Button variant="outline-warning" onClick={this.save}>Save</Button>
          
          </div>
    </article> 
    </div>
 
);}

      render()
      {
        if(this.state.editing)
        
          return this.renderEdit();
        
        else
        return this.renderNormal()
      }

  
};

export default TourGuyProfile;