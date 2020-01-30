import React, { Component } from 'react';
import { Card } from 'react-bootstrap/';
import guide from './DB' //Import the file where the data is stored.
import {
  Link
} from 'react-router-dom';
import { Container, Row} from 'react-bootstrap/';
import Rater from 'react-rater';

class TourGuyProfile  extends Component {
  constructor(){
    super();
    this.state={
      rate:  0,
      raters: 0
    }
  }
  showRate(e){
  if(this.state.rate/this.state.raters > 0)
  return (<h6>{ parseFloat(this.state.rate/this.state.raters).toFixed(1) } Stars</h6>)
}

  render() {
    console.log(this.state.rate);
      console.log(this.state.raters);
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
              <img className="img-fluid rounded mb-4 mb-lg-0" src="https://images.squarespace-cdn.com/content/v1/5ca3511f11f78419cf065b0a/1555516093588-GQVMGCVN8RXPIS4KK2QF/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/Lucy+Palette12071600023_t1.jpg" alt="" />
            </div>
            {/* /.col-lg-8 */}
            <div className="col-lg-5">
              <h1 className="font-weight-light">Tour Guy Name</h1>
              <p>Tour guy brand statement and description.. Tour guy brand statement and description..Tour guy brand statement and description..Tour guy brand statement and description</p>
              <Rater total={5} rating={this.state.rate/this.state.raters} style={{cursor:'pointer'}} onRate={(rating)=>{this.setState((prev)=>({raters: prev.raters +1, rate: rating.rating + prev.rate}));}} /> 
                       {this.showRate()}
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