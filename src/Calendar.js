// import React, { Component } from 'react';
// import 'moment/locale/it.js';
// import { DatePicker, DatePickerInput } from 'rc-datepicker';
// import 'moment/locale/fr.js';
// // import 'rc-datepicker/node_modules/moment/locale/fr.js';


// class Calendar  extends Component {
//   constructor(props){
//     super(props);
//     var today = new Date(),
//             date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//     this.state={
//       date: date
//     }
//   }

//   onChange = (jsDate, dateString) => {
//     // ...
//      console.log(dateString ); 
//      console.log(jsDate ); 
//   }

//   render() {
        
//     return (
//         <div>
//          <div>
//     // this renders the full component (input and datepicker)
//     <DatePickerInput
//       onChange={this.onChange}
//       value={this.state.date}
//       className='my-custom-datepicker-component'
//       // {...anyReactInputProps}
//     />

//     // this renders only a fixed datepicker
//     <DatePicker onChange={this.onChange} value={this.state.date} />
//   </div>,
//   document.body
//         </div>
//   );}
  
// };

// export default Calendar;

import React from "react";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
class Calendar extends React.Component {
  state = {
    startDate: new Date()
  };
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
 
  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
}
export default Calendar;