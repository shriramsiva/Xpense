import React, { useContext }  from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import { createIconFont } from '@rsuite/icons';

import { IncomeExpenses } from "./IncomeExpenses";
import { Balance } from "./Balance";
import { TransactionList } from "./TransactionList";
import { AddTransaction } from "./AddTransaction";
import { CustomNavbar } from "./Navbar";
import { Modal, ButtonToolbar, Button,Badge,Notification, Placeholder, 
  useToaster, SelectPicker} from 'rsuite';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';


const Dashboard = () => {
  const { transactions } = useContext(GlobalContext);

  const history = useHistory();
  const [logout, setLogout] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [type, setType] = React.useState('info');
  const [placement, setPlacement] = React.useState('bottomStart');
  const toaster = useToaster();

  const userEmail = localStorage.getItem('user');

  const IconFont = createIconFont({
    scriptUrl: '//at.alicdn.com/t/font_2144422_r174s9i1orl.js',
    commonProps: { style: { fontSize: 30, color: '#1675e0' } },
    onLoaded: () => {}
  });

  const handleEntered = () => {
    setTimeout(() => setRows(80), 200);
  };

  const message = (
    <Notification style={{ width: 250 }}  type={type} header={type} closable>
      Welcome ,<b> {userEmail}</b>!
    </Notification>
  );

  
  
  React.useEffect(() => {
    if (!localStorage.getItem("auth")) history.push("/login");
    // toaster.push(message, { placement })
  }, [logout]);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth");
    setLogout(true);
  };

   return (
    <>
    <div style={{ backgroundImage: 'url("images/blue.jpg")',height:657}}>
   <CustomNavbar  appearance="subtle" activeKey={activeKey} onSelect={setActiveKey} />
      
      <div   className="container">
        {/* <h6 style={{textAlign: "left"}}>Welcome {userEmail} </h6> */}
      <Balance />
      <IncomeExpenses />
      <ButtonToolbar>
      <Badge content={transactions.length}>
        <Button onClick={handleOpen}>   <IconFont icon="rs-iconreload" pulse /> Transactions history</Button>
        </Badge>
      </ButtonToolbar>
      
      <Modal className="contain"
        open={open}
        onClose={handleClose}
        onEntered={handleEntered}
        onExited={() => {
          setRows(0);
        }}
      >
        <Modal.Header>
          <Modal.Title><h3>History</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
      
           <TransactionList />

            </Modal.Body>
        <Modal.Footer>

          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          </Modal.Footer>
      </Modal>
              {/* <AddTransaction   /> */}
      </div>
         </div>
      
    </>
  );
};

export default Dashboard;
