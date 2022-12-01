import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
import { Message, useToaster} from 'rsuite';
import { CustomNavbar } from "./Navbar";

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [check,setCheck] =useState('');
  const [date,setDate] =useState('');

  const [amount, setAmount] = useState('');

  const [activeKey, setActiveKey] = React.useState(null);

  const { addTransaction } = useContext(GlobalContext);

  const [type] = React.useState('success');
  const [typeForm] = React.useState('warning');
  const [placement] = React.useState('bottomStart');
  const toaster = useToaster();

  const message = (
    <Message showIcon type={type}>
      {type}: Transaction added successfully.
    </Message>
  );

  const formMessage = (
    <Message showIcon type={typeForm}>
      {typeForm}: please fill all the details.
    </Message>
  );

  const handleDate =e=>{
    var dates = e.target.value;
    var k = dates.toString().replace("T", " ");
   setDate(k)
  }

 
  const onSubmit = e => {
    e.preventDefault();

    function amounts(){
    if(check==='Expense'){
      return -amount
     }else{
      return +amount
     }

    }
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      date,
     amount: amounts()
    }
    addTransaction(newTransaction);
  }

  const formValidation =()=> {

    
    if(text=== ''){
      toaster.push(formMessage, { placement })
    }
    else if(amount=== ''){
      toaster.push(formMessage, { placement })

    }else if(date=== ''){
      toaster.push(formMessage, { placement })

    }else if(check=== ''){
      toaster.push(formMessage, { placement })

    }
    else
      {
      toaster.push(message, { placement })
    } 

  }

  return (
    <>
     <div style={{ backgroundImage: 'url("images/blue.jpg")',height:657}}>
       <CustomNavbar appearance="subtle" activeKey={activeKey} onSelect={setActiveKey} />

    <div className="container">
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Description</label>
          <select className="texted" onChange={(e) => setText(e.target.value)} >
        <option value="Salary">Salary</option>
        <option value="Food">Food</option>
        <option value="Grocery">Grocery</option>
        <option value="Fuel">Fuel</option>
      </select>      
        </div>
            <div className="form-control">
          <label htmlFor="text">Income/Expense </label>
      <br/>
       <input type="radio" value="Income" name="gender" onChange={(e) => setCheck(e.target.value)} required/> Income
        <input type="radio" value="Expense" name="gender" onChange={(e) => setCheck(e.target.value)} required/>  Expense
        
        </div>
        <div className="form-control">
        <label htmlFor="text">Date</label>
        <br/>
        <input type="datetime-local" value={date} onChange={handleDate}  required/>

        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            </label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..."  required/>
        </div>
        <button onClick={formValidation} className="btn">Add transaction</button>
      </form>
      </div>
      </div>
    </>
  )
}
