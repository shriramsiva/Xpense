import React, { useContext }  from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import { createIconFont } from '@rsuite/icons';
import { IncomeExpenses } from "./IncomeExpenses";
import { Balance } from "./Balance";
import { TransactionList } from "./TransactionList";
import { CustomNavbar } from "./Navbar";
import { Modal, ButtonToolbar, Button,Badge} from 'rsuite';
import { GlobalContext } from '../context/GlobalState';


const Dashboard = () => {
  const { transactions } = useContext(GlobalContext);
  const history = useHistory();
  const [logout] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [ setRows] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const IconFont = createIconFont({
    scriptUrl: '//at.alicdn.com/t/font_2144422_r174s9i1orl.js',
    commonProps: { style: { fontSize: 30, color: '#1675e0' } },
    onLoaded: () => {}
  });

  const handleEntered = () => {
    setTimeout(() => setRows(80), 200);
  };

  
  React.useEffect(() => {
    if (!localStorage.getItem("auth")) history.push("/login");
  }, [logout]);

     return (
    <>
    <div style={{ backgroundImage: 'url("images/blue.jpg")',height:657}}>
   <CustomNavbar  appearance="subtle" activeKey={activeKey} onSelect={setActiveKey} />
      
      <div   className="container">
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
      </div>
         </div>
      
    </>
  );
};

export default Dashboard;
