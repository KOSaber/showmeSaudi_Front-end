import guide from './DB' //Import the file where the data is stored.
import React, { Component } from 'react';
import TourForm from './TourForm'
import {
  Container,CustomInput, Col,Row, Form,FormText,
  FormGroup, Label, Input,
  Button
} from 'reactstrap';
import {
    Link
   } from 'react-router-dom';
import './App.css';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { render } from "react-dom";
import ReactPhoneInput from "react-phone-input-2";
import axios from 'axios'

class SignUp extends Component {
    state={
        moreInfo:"",
        status: false,
        phone: "",
        api:"http://localhost:7000/api/newRuser"
    }
    showInfo(e){
        // e.preventDefault()
        this.setState({api:"http://localhost:7000/api/newTuser"//,moreInfo:<TourForm onChange={this.handleOnChange}/>
      })
    //console.log(this.state.api)
      }
    hideInfo(e){
        // e.preventDefault()
        this.setState({api:"http://localhost:7000/api/newRuser",moreInfo:''})
        
      }
    handleChange(e) {
        this.setState({status: !this.state.status})
        if(!this.state.status){
        this.showInfo(e);}else {this.hideInfo(e)}
      }
    //   setValue = (event) => {
    //     // event.preventDefault();
        
    //     this.setState({value: event.target.value })
    // }

    handleOnChange = value => {
        console.log(value);
        this.setState({ phone: value }, () => {
          console.log(this.state.phone);
        });}

    //yasser type her
      changeTheStateForform = (e)=>{
        this.setState({
          [e.target.name] : e.target.value
        })
      }

      onsubmitTheStateToPosted = ()=>{

        axios.post( this.state.api,this.state)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      }

  render() {
    console.log(this.state)
  return (
    <div >
      <br/><br/><br/><br/><br/>
      <h2 className="title">Sign Up</h2>
     <Form className="SignUp" onSubmit ={this.onsubmitTheStateToPosted}> 
    <Row>
      <Col>
        <FormGroup className="col-md-10">
            <Label for="First Name">First Name :</Label>
            <Input type="text" name="firstName" id="First Name" placeholder="Enter your First Name"  onChange={this.changeTheStateForform}/>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup className="col-md-10">
            <Label for="Last Name">Last Name :</Label>
            <Input type="text" name="lastName" id="Last Name" placeholder="Enter your Last Name" onChange={this.changeTheStateForform}/>
        </FormGroup>
      </Col>
      </Row>
      <Row>
      <Col>
      <FormGroup className="col-md-10">
        <Label for="Phone Number">Phone Number : </Label>
        {/* <Input type="tel" name="Phone" id="Phone" pattern="[+]{1}[0-9]{11,14}" placeholder="+966 " /> */}
        {/* const [value, setValue] = useState()value={this.props.value} onChange={this.props.onChange} */}
        {/* <PhoneInput placeholder="Enter phone number" value={this.state.value} onChange={(e)=>this.setValue(e)}/> */}
        <ReactPhoneInput inputExtraProps={{name: "phone",required: true,autoFocus: true}}
          defaultCountry={"sa"} value={this.state.phone} placeholder="+966" onChange={this.handleOnChange}/>
      </FormGroup>
      </Col>
      <Col>
      <FormGroup className="col-md-10">
        <Label for="exampleEmail">Email :</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder"  onChange={this.changeTheStateForform}/>
      </FormGroup>
      </Col>
      </Row>
      <Row>
      <Col>
      <FormGroup className="col-md-10">
        <Label for="examplePassword">Password :</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" onChange={this.changeTheStateForform} />
      </FormGroup>
      </Col>
      <Col>
      <FormGroup className="col-md-10">
        <Label for="examplePassword">Confirm Password :</Label>
        <Input type="password" name="password_confirmation" id="password_confirmation" onChange={this.changeTheStateForform}/>
      </FormGroup>
      </Col>
      </Row>
      <Row>
      <Col>
      <FormGroup className="col-md-10">
          <Label for="exampleSelectMulti">City</Label>
          <Input type="select" name="city" id="exampleSelect" onChange={this.changeTheStateForform}>
          <option name="Riyadh" value="Riyadh" >Riyadh</option>
          <option name="Jeddah" value="Jeddah">Jeddah</option>
          <option name="Al-Ola" value="Al-Ola">Al-Ola</option>
          <option name="Al-khobar" value="Al-khobar" >Al-khobar</option>
          <option name="Abha" value="Abha">Abha</option>
          <option name="Jazan" value="Jazan">Jazan</option>
          <option name="Az Zulfi" value="Az Zulfi">Az Zulfi</option>
          <option name="Makkah" value="Makkah">Makkah</option>
          <option name="Al-Madinah" value="Al-Madinah">Al-Madinah</option>
        </Input>
      </FormGroup>
      </Col>  
      <Col>
      <FormGroup className="col-md-10">
          <Label for="exampleFile">Personal Picture</Label>
          {/* <Input type="file" name="file" id="exampleFile" /> */}
          <CustomInput method="post" action="/upload" enctype="multipart/form-data" type="file" name="img" id="exampleFile" label="Please choose your Personal photo" onChange={this.changeTheStateForform}  />
            {/* <FormText color="muted">
                Please choose your Personal photo ...
          </FormText> */}
      </FormGroup>
      </Col>
      </Row>
      <Col>
        <FormGroup tag="fieldset">
        <Label>User Type : </Label>
          <CustomInput type="switch" id="exampleCustomSwitch2" name="tourType" label="Tour" onChange={(e)=>this.handleChange(e)} />
          {this.state.moreInfo}
        {/* <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" onClick={(e)=> this.hideInfo(e)}/>{' '}
            Regular user
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" onClick={(e)=> this.showInfo(e)}/>{' '}
            Tour
            {this.state.moreInfo}
          </Label>
        </FormGroup> */}
      </FormGroup>
      </Col>
      <Col>
      <Button onClick ={this.onsubmitTheStateToPosted} > Submit</Button>
      <Link to="/SignIn"><Button className='log'>Sign In</Button></Link>
      </Col>
    </Form>
    </div>
  );
}}

export default SignUp;