import React, {useState, useEffect} from "react";

import {Navbar, Nav} from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';
import DoingRoundIcon from '@rsuite/icons/DoingRound';
import ExitIcon from '@rsuite/icons/Exit';
import { useHistory } from "react-router-dom";

import {createIconFont} from '@rsuite/icons';

export const CustomNavbar = ({
    onSelect,
    activeKey,
    ...props
}) => {
    const [logout, setLogout] = React.useState(false);

    const history = useHistory();

    const IconFont = createIconFont({
        scriptUrl: '//at.alicdn.com/t/font_2144422_r174s9i1orl.js',
        commonProps: {
            style: {
                fontSize: 30,
                color: '#1675e0'
            }
        },
        onLoaded: () => {}
    });

    const [dateState,
        setDateState] = useState(new Date());

    useEffect(() => {
        setInterval(() => setDateState(new Date()), 30000);
    }, []);

    React.useEffect(() => {
        if (!localStorage.getItem("auth")) history.push("/login");
      }, [logout]);

    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem("auth");
        setLogout(true);
      };

      function handleHome() {
        history.push("/");
      }

  function handleClick() {
    history.push("/transactions");
  }

  function handleContact() {
    history.push("/contact");
  }

    return (
        <Navbar {...props}>
            <Navbar.Brand href="#">
                <IconFont icon="rs-icongear-16" spin/>

                XPENSE TRACKER</Navbar.Brand>
            <Nav onSelect={onSelect} activeKey={activeKey}>
                <Nav.Item eventKey="1" onClick={ handleHome} icon={< HomeIcon />}>
                    Home
                </Nav.Item>
                <Nav.Item eventKey="2" onClick={ handleClick} icon={<  DoingRoundIcon />}>Transactions</Nav.Item>
                <Nav.Item eventKey="3" onClick={handleContact}>Contact Us</Nav.Item>
              
            </Nav>
            <Nav pullRight>
                <Nav.Item eventKey="3">
                    <p>
                        {' '}
                        {dateState.toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}
                        {' '}
                        {dateState.toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        })}
                    </p>
                </Nav.Item>
                <Nav.Item icon={< CogIcon />} eventKey="8">Settings</Nav.Item>
                <Nav.Item onClick={logoutHandler} eventKey="4" icon={<  ExitIcon/>} >Log Out</Nav.Item>
                
            </Nav>
        </Navbar>
    );
};
