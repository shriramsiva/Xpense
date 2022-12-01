import React , { useState } from 'react';
import {emailValidator, passwordValidator} from '../components/regexValidator';
import {useHistory} from "react-router-dom"
import axios from "axios";
import { Modal, ButtonToolbar, Button,Badge,Notification, Placeholder, 
	useToaster, SelectPicker} from 'rsuite';

const Login = () => {
    const history = useHistory()

    const [input,
        setInput] = React.useState({email: '', password: ''});

    const [errorMessage,
        seterrorMessage] = React.useState('');
    const [successMessage,
        setsuccessMessage] = React.useState('');

		const [user, setUser] = useState([]);

		const [type, setType] = React.useState('info');
		const [placement, setPlacement] = React.useState('bottomStart');
		const toaster = useToaster();
		const userEmail = localStorage.getItem('user');

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

	const fetchData = () => {
		return axios.get("https://mocki.io/v1/7a6c3c3a-128e-42d8-bd96-08f4a83096ef")
			  .then((response) => setUser(response.data));
	  }

    React.useEffect(() => {
		fetchData();

        if (localStorage.getItem('auth')) 
            history.push('/')
    }, [])

	const message = (
		<Notification style={{ width: 250 }}  type={type} header={type}>
		  Welcome ,<b> {userEmail}</b>!
		</Notification>
	  );

    const formSubmitter = e => {
    
        e.preventDefault();
        setsuccessMessage('');
        if (!emailValidator(input.email)) 
            return seterrorMessage('Please enter valid email id');
        
        if (!passwordValidator(input.password)) 
            return seterrorMessage('Password should have minimum 8 character with the combination of uppercase, lowe' +
                    'rcase, numbers and specialcharaters');
      

        const userss = user.find((users) => users.email === input.email && users.pass === input.password);
        console.log(userss)

         if(input.email !== '' ){
			console.log(input.email)
		 }
        // seterrorMessage('Invalid email or password');
        if (!userss) 
            return seterrorMessage('Invalid email or password');
        
        history.push('/')
        localStorage.setItem('auth', true)
		localStorage.setItem('user',input.email)    
		toaster.push(message, { placement })

		console.log(localStorage.getItem('user') )     

    };

    return (
        <div>
            <div className="limiter">
                <div
                    className="container-login100"
                    style={{
                    backgroundImage: 'url("images/bg-01.jpg")'
                }}>
                    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                        <form className="login100-form validate-form" onSubmit={formSubmitter}>
                            <span className="login100-form-title p-b-49">Login</span>
                            {errorMessage.length > 0 && <div
                                style={{
                                marginBottom: '10px',
                                color: 'red'
                            }}>{errorMessage}</div>}
                            {successMessage.length > 0 && (
                                <div
                                    style={{
                                    marginBottom: '10px',
                                    color: 'green'
                                }}>{successMessage}</div>
                            )}
                            <div
                                className="wrap-input100 validate-input m-b-23"
                                data-validate="email is required">
                                <span className="label-input100">Email</span>
                                <input
                                    className="input100"
                                    type="text"
                                    name="email"
                                    placeholder="Type your username"
                                    onChange={handleChange}/>
                                <span className="focus-input100" data-symbol=""/>
                            </div>
                            <div
                                className="wrap-input100 validate-input"
                                data-validate="Password is required">
                                <span className="label-input100">Password</span>
                                <input
                                    className="input100"
                                    type="password"
                                    name="password"
                                    placeholder="Type your password"
                                    onChange={handleChange}/>
                                <span className="focus-input100" data-symbol=""/>
                            </div>
                            <div className="text-right p-t-8 p-b-31">
                                <a href="https://msg91.com/send-otp/">Forgot password?</a>
                            </div>
                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn"/>
                                    <button className="login100-form-btn">Login</button>
                                </div>
                            </div>
                            <div className="txt1 text-center p-t-54 p-b-20">
                                <span>Or Sign Up Using</span>
                            </div>
                            <div className="flex-c-m">
                                <a href="www.fb.com" className="login100-social-item bg1">
                                    <i className="fa fa-facebook"/>
                                </a>
                                <a href="www.twitter.com" className="login100-social-item bg2">
                                    <i className="fa fa-twitter"/>
                                </a>
                                <a href="www.gmail.com" className="login100-social-item bg3">
                                    <i className="fa fa-google"/>
                                </a>
                            </div>
                            {/* <div className="flex-col-c p-t-155">
                <span className="txt1 p-b-17">Or Sign Up Using</span>
                <a href="#" className="txt2">
                  Sign Up
                </a>
              </div> */}
                        </form>
                    </div>
                </div>
            </div>
            <div id="dropDownSelect1"/>
        </div>
    );
};

export default Login;
