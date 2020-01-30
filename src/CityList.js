import React, { Component } from 'react';
import { Card } from 'react-bootstrap/';
import guide from './DB'; //Import the file where the data is stored.
import ListTourGuyInCity from './ListTourGuyInCity';
import { Container, Row} from 'react-bootstrap/';
import {
    Link
  } from 'react-router-dom';



class CityList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            onDisplay: " " //This state will be used to render the Display component only after an event (onClick).
        }
        this.setDisplayItem = this.setDisplayItem.bind(this) //Bind the click handling method setDisplayItem to 'this'
    }

    //handles the change of the state onDisplay to render the Display component with the user's chosen item from the currently displayed list.
    setDisplayItem(item) {
        this.setState({
            onDisplay: <ListTourGuyInCity displayItem={item}></ListTourGuyInCity>
        })
    }




    render() {
     
        const AllCities=guide.map((item, index) => {

          
            return <div key={index} className='Card'>
           <div className='ContainerHomeCity'>
               
                <Card style={{ width: '15rem', margin: '2px', marginBottom: '30px' }} className="cardHov">
                    {/* Add onClick event handler to the name and an image of the place */}

                    <Card.Img variant="top" src={item.imgSrc} width="250" height="250" />
                    <Card.Body>
                    <button onClick={() => this.setDisplayItem(item)}> {item.city} </button>
                    {/* <Link to="/TourGuy">{item.city}</Link> */}
                    </Card.Body>
                </Card>
            </div>
            </div>
        })   
        return (
            <Container>
            <Row className='Cont'>
                  {/* render the list of city generated in the render method above */}
                  {AllCities}
            </Row>
        </Container>
          
        )   
    }
}
export default CityList;