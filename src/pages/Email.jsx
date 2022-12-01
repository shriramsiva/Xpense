import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { CustomNavbar } from "./Navbar";
import { Message, useToaster} from 'rsuite';

export const ContactUs = () => {
  const form = useRef();
  const [activeKey, setActiveKey] = React.useState(null);
  const [type] = React.useState('success');
  const [typeForm] = React.useState('error');

  const [placement] = React.useState('bottomStart');

  const toaster = useToaster();

  const message = (
    <Message showIcon type={type}>
      {type}: Mail sent successfully.
    </Message>
  );

  const errorMessage = (
    <Message showIcon type={typeForm}>
      {typeForm}: Error! please try again later.
    </Message>
  );
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_lkfrylh', 'template_jhxww88', form.current, '_RBBxFRWkCzW8Xzb1')
      .then((result) => {
          console.log(result.text);
          console.log("message sent");
          toaster.push(message, { placement })
      }, (error) => {
          console.log(error.text);
          toaster.push(errorMessage, { placement })

      });
  };

  return (
    <>
         <div style={{ backgroundImage: 'url("images/blue.jpg")',height:657}}>

   <CustomNavbar appearance="subtle" activeKey={activeKey} onSelect={setActiveKey} />
       <div className="container">
      <h3>Contact Us</h3>

    <form ref={form} onSubmit={sendEmail}>
    <div className="form-control">

      <label htmlFor="text">Name</label>
      <input className="texted" type="text" placeholder="Enter Name" name="user_name" required/>
      </div>
      <div className="form-control">
      <label htmlFor="text">Email</label>
      <input className="texted" type="email" placeholder="Enter Email"  name="user_email" required />
      </div>
      <div className="form-control">
      <label htmlFor="text">Message</label>
      <br/>
      <textarea  name="message"  rows="5" cols="37" placeholder="Enter text..." required/>
      </div>
      <input  className="btn" type="submit" value="Send" />
    </form>
    </div>
    </div>
</>


  );
};