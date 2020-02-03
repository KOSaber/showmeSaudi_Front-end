import guide from './DB' //Import the file where the data is stored.
import React, { Component } from 'react';
import TourForm from './TourForm'
import {
  Container,CustomInput, Col,Row, Form,FormText,
  FormGroup, Label, Input,
  Button,DropdownButton,Dropdown,InputGroupButtonDropdown,
  InputGroupDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {
    Link
   } from 'react-router-dom';
import './App.css';
import 'react-phone-number-input/style.css';
import ReactPhoneInput from "react-phone-input-2";
import axios from 'axios'
import FileUpload from './FileUpload';
import ImageUpload from './components/ImageUpload'
import {storage} from './firebase';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0,
      moreInfo:"",
        status: false,
        phone: "",
        api:"http://localhost:7000/api/newRuser"
    }
    // this.handleChangeImage = this
    //   .handleChangeImage
    //   .bind(this);
    //   this.handleUpload = this.handleUpload.bind(this);
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
        this.showInfo(e);
      }
        else {
          this.hideInfo(e)
        }
      }
      
    handleTwoFun = e => {
      this.handleUpload()    
      this.onsubmitTheStateToPosted() 
    }

      //img
      handleChangeImage = e => {
        if (e.target.files[0]) {
          const image = e.target.files[0];
          this.setState(() => ({image}));
        }
      }

    handleUpload = () => {
      console.log("handleupload");
      const {image} = this.state;
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({ image: url});
        })
    });
  }

  //phone
    handleOnChange = value => {
        console.log(value);
        this.setState({ phone: value }, () => {
          console.log(this.state.phone);
        });}

    //yass
    //to see every change in form
      changeTheStateForform = (e)=>{
        this.setState({
          [e.target.name] : e.target.value
        })
      }
      //send this to api
      onsubmitTheStateToPosted = ()=>{
        console.log("onsubmitTheStateToPosted");
        // console.log(this.state ,this.state.api )
        axios.post( this.state.api,this.state)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      }
  render() {
    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
      
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
          <CustomInput method="post" action="/upload" enctype="multipart/form-data" type="file" name="image" id="exampleFile" label="Please choose your Personal photo" onChange={this.changeTheStateForform}  />
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
          <div style={style}>
      <progress value={this.state.progress} max="100"/>
      <br/>
        <input type="file" name="image" onChange={(e)=>{
          this.handleChangeImage (e)
        setTimeout(() => {
          this.handleUpload()
        }, 1000);}}/>
        {/* <button onClick ={this.handleUpload} >Upload</button> */}
        <br/>
        <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/>
      </div>          
          
      </FormGroup>
      </Col>
      <Col>
      
      <Button onClick ={this.onsubmitTheStateToPosted}> Submit</Button>
      <Link to="/SignIn"><Button className='log'>Sign In</Button></Link>
      </Col>
    </Form>
    </div>
  );
}}
export default SignUp;