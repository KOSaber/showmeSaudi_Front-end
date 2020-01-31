import guide from './DB' //Import the file where the data is stored.
import React, { Component } from 'react';
import {
  Container,CustomInput, Col, Form,FormText,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import './App.css';
import axios from 'axios'


class TourForm extends Component{
    changeTheStateForform = (e)=>{
        this.setState({
          [e.target.name] : e.target.value
        })
      }

      onsubmitTheStateToPosted = ()=>{

        axios.post( "http://localhost:7000/api/newTuser",this.state)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      }
    render(){
        return(
            <dev>
                
            <Form onSubmit ={this.onsubmitTheStateToPosted}>
            
            <FormGroup>
                <Label for="exampleText">About Me ..</Label>
                <Input type="textarea" name="AboutMe" id="exampleText" onChange={this.changeTheStateForform}/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleFile">Personal Picture</Label>
                {/* <Input type="file" name="file" id="exampleFile" /> */}
                <CustomInput method="post" action="upload" enctype="multipart/form-data" type="file" name="img" id="exampleFile" label="Please choose your Personal photo" onChange={this.changeTheStateForform}  />
                {/* <FormText color="muted">
                      Please choose your Personal photo ...
                </FormText> */}
            </FormGroup>
            <FormGroup>
                <Label for="exampleText">Activity ..</Label>
                <Input type="textarea" name="activity1" id="activity1" placeholder="Please Enter your First activity"/><br/>
                <Input type="textarea" name="activity2" id="activity2" placeholder="Please Enter your Second activity"/><br/>
                <Input type="textarea" name="activity3" id="activity3" placeholder="Please Enter your Third activity"/><br/>
            </FormGroup>
            </Form>
            </dev>
        )
    }

}

export default TourForm